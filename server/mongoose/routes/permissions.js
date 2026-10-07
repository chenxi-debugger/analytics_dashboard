import express from 'express';
import Permission from '../models/Permission.js';
import { requireAuth, requireRole } from '../../middleware/auth.js';

const router = express.Router();

// GET /api/permissions?q=
router.get('/', async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    const filter = q ? { name: new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') } : {};
    const items = await Permission.find(filter).sort({ createdAt: 1 });
    res.json({ items: items.map((p) => p.toPublicJSON()) });
  } catch (err) {
    console.error('❌ List permissions error:', err);
    res.status(500).json({ message: 'Failed to load permissions.' });
  }
});

// POST /api/permissions  { name, assignedTo: [roleName], isCore }
router.post('/', requireAuth, requireRole('Administrator'), async (req, res) => {
  try {
    const { name, assignedTo = [], isCore = false } = req.body || {};
    if (!name || !name.trim()) return res.status(400).json({ message: 'Permission name is required.' });
    const item = await Permission.create({ name: name.trim(), assignedTo, isCore });
    res.status(201).json(item.toPublicJSON());
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'That permission already exists.' });
    console.error('❌ Create permission error:', err);
    res.status(400).json({ message: 'Could not create permission.' });
  }
});

// PUT /api/permissions/:id
router.put('/:id', requireAuth, requireRole('Administrator'), async (req, res) => {
  try {
    const item = await Permission.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Permission not found.' });
    const { name, assignedTo, isCore } = req.body || {};
    if (name !== undefined) item.name = name.trim();
    if (assignedTo !== undefined) item.assignedTo = assignedTo;
    if (isCore !== undefined) item.isCore = !!isCore;
    await item.save();
    res.json(item.toPublicJSON());
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'That permission already exists.' });
    console.error('❌ Update permission error:', err);
    res.status(400).json({ message: 'Could not update permission.' });
  }
});

// DELETE /api/permissions/:id
router.delete('/:id', requireAuth, requireRole('Administrator'), async (req, res) => {
  try {
    const item = await Permission.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Permission not found.' });
    if (item.isCore) return res.status(403).json({ message: 'Core permissions cannot be deleted.' });
    await item.deleteOne();
    res.json({ message: 'Permission deleted.' });
  } catch (err) {
    console.error('❌ Delete permission error:', err);
    res.status(500).json({ message: 'Could not delete permission.' });
  }
});

export default router;
