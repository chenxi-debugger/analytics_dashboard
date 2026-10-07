import express from 'express';
import Role, { PERMISSION_MODULES } from '../models/Role.js';
import User from '../models/User.js';
import Permission from '../models/Permission.js';
import { requireAuth, requireRole } from '../../middleware/auth.js';

const router = express.Router();

// Keep only known modules and coerce the flags to booleans.
function cleanPermissions(list = []) {
  return PERMISSION_MODULES.map((module) => {
    const found = list.find((p) => p.module === module) || {};
    return { module, read: !!found.read, write: !!found.write, create: !!found.create };
  });
}

// GET /api/roles — every role with its user count
router.get('/', async (req, res) => {
  try {
    const [roles, counts] = await Promise.all([
      Role.find().sort({ createdAt: 1 }),
      User.aggregate([{ $group: { _id: '$role', count: { $sum: 1 } } }]),
    ]);
    const countMap = Object.fromEntries(counts.map((c) => [c._id, c.count]));
    res.json({
      modules: PERMISSION_MODULES,
      items: roles.map((r) => ({ ...r.toPublicJSON(), userCount: countMap[r.name] || 0 })),
    });
  } catch (err) {
    console.error('❌ List roles error:', err);
    res.status(500).json({ message: 'Failed to load roles.' });
  }
});

// POST /api/roles  { name, description, permissions }
router.post('/', requireAuth, requireRole('Administrator'), async (req, res) => {
  try {
    const { name, description = '', permissions } = req.body || {};
    if (!name || !name.trim()) return res.status(400).json({ message: 'Role name is required.' });
    const role = await Role.create({ name: name.trim(), description, permissions: cleanPermissions(permissions) });
    res.status(201).json({ ...role.toPublicJSON(), userCount: 0 });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'A role with that name already exists.' });
    console.error('❌ Create role error:', err);
    res.status(400).json({ message: 'Could not create role.' });
  }
});

// PUT /api/roles/:id — rename or change permissions. Renaming also updates users and permissions.
router.put('/:id', requireAuth, requireRole('Administrator'), async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found.' });

    const oldName = role.name;
    const { name, description, permissions } = req.body || {};
    if (name && name.trim() !== oldName) {
      if (role.name === 'Administrator') return res.status(403).json({ message: 'The Administrator role cannot be renamed.' });
      role.name = name.trim();
    }
    if (description !== undefined) role.description = description;
    if (permissions) {
      if (oldName === 'Administrator') {
        return res.status(403).json({ message: 'Administrator permissions are fixed (full access).' });
      }
      role.permissions = cleanPermissions(permissions);
    }
    await role.save();

    if (role.name !== oldName) {
      await User.updateMany({ role: oldName }, { role: role.name });
      await Permission.updateMany({ assignedTo: oldName }, { $set: { 'assignedTo.$': role.name } });
    }
    const userCount = await User.countDocuments({ role: role.name });
    res.json({ ...role.toPublicJSON(), userCount });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'A role with that name already exists.' });
    console.error('❌ Update role error:', err);
    res.status(400).json({ message: 'Could not update role.' });
  }
});

// DELETE /api/roles/:id — custom roles only, and only when no user has it
router.delete('/:id', requireAuth, requireRole('Administrator'), async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found.' });
    if (role.isSystem) return res.status(403).json({ message: 'Built-in roles cannot be deleted.' });
    const inUse = await User.countDocuments({ role: role.name });
    if (inUse > 0) return res.status(400).json({ message: `${inUse} user(s) still have this role.` });
    await Permission.updateMany({}, { $pull: { assignedTo: role.name } });
    await role.deleteOne();
    res.json({ message: 'Role deleted.' });
  } catch (err) {
    console.error('❌ Delete role error:', err);
    res.status(500).json({ message: 'Could not delete role.' });
  }
});

export default router;
