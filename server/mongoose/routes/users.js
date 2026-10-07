import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { requireAuth, requireRole } from '../../middleware/auth.js';

const router = express.Router();

const CAN_MANAGE_USERS = ['Administrator', 'Manager'];
const EDITABLE_FIELDS = ['fullName', 'username', 'email', 'role', 'plan', 'status', 'contact', 'company', 'country',
  'language', 'billing', 'avatarColor'];

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// GET /api/users?q=&role=&plan=&status=&page=1&limit=10
// Public (read-only) so visitors can browse the demo without logging in.
router.get('/', async (req, res) => {
  try {
    const { q = '', role, plan, status } = req.query;
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);

    const filter = {};
    if (role) filter.role = role;
    if (plan) filter.plan = plan;
    if (status) filter.status = status;
    if (q.trim()) {
      const re = new RegExp(escapeRegex(q.trim()), 'i');
      filter.$or = [{ fullName: re }, { email: re }, { username: re }];
    }

    const [items, total] = await Promise.all([
      User.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      User.countDocuments(filter),
    ]);
    res.json({ items: items.map((u) => u.toPublicJSON()), total, page, limit });
  } catch (err) {
    console.error('❌ List users error:', err);
    res.status(500).json({ message: 'Failed to load users.' });
  }
});

// GET /api/users/stats — numbers for the cards at the top of the list page
router.get('/stats', async (req, res) => {
  try {
    const [total, active, pending, inactive, byRole] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ status: 'active' }),
      User.countDocuments({ status: 'pending' }),
      User.countDocuments({ status: 'inactive' }),
      User.aggregate([{ $group: { _id: '$role', count: { $sum: 1 } } }]),
    ]);
    const roleCounts = Object.fromEntries(byRole.map((r) => [r._id, r.count]));
    res.json({ total, active, pending, inactive, roleCounts });
  } catch (err) {
    console.error('❌ User stats error:', err);
    res.status(500).json({ message: 'Failed to load stats.' });
  }
});

// GET /api/users/:id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user.toPublicJSON());
  } catch {
    res.status(404).json({ message: 'User not found.' });
  }
});

// POST /api/users — create a user (Administrator / Manager)
router.post('/', requireAuth, requireRole(...CAN_MANAGE_USERS), async (req, res) => {
  try {
    const { password, ...rest } = req.body || {};
    if (!rest.fullName || !rest.username || !rest.email) {
      return res.status(400).json({ message: 'Full name, username and email are required.' });
    }
    if (!password || password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters.' });
    }
    // Only an Administrator may create another Administrator.
    if (rest.role === 'Administrator' && req.user.role !== 'Administrator') {
      return res.status(403).json({ message: 'Only an Administrator can create Administrators.' });
    }
    const data = Object.fromEntries(EDITABLE_FIELDS.filter((k) => rest[k] !== undefined).map((k) => [k, rest[k]]));
    const user = await User.create({ ...data, passwordHash: await bcrypt.hash(password, 10) });
    res.status(201).json(user.toPublicJSON());
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'That email or username is already taken.' });
    console.error('❌ Create user error:', err);
    res.status(400).json({ message: err.message || 'Could not create user.' });
  }
});

// PUT /api/users/:id — update a user (Administrator / Manager)
router.put('/:id', requireAuth, requireRole(...CAN_MANAGE_USERS), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    if (user.isDemoAdmin && (req.body.role || req.body.status || req.body.email)) {
      return res.status(403).json({ message: 'The demo admin account’s role, status and email are locked.' });
    }
    if ((req.body.role === 'Administrator' || user.role === 'Administrator') && req.user.role !== 'Administrator') {
      return res.status(403).json({ message: 'Only an Administrator can change Administrators.' });
    }

    EDITABLE_FIELDS.forEach((key) => {
      if (req.body[key] !== undefined) user[key] = req.body[key];
    });
    if (req.body.password) {
      if (user.isDemoAdmin) return res.status(403).json({ message: 'The demo admin password is locked.' });
      if (req.body.password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters.' });
      user.passwordHash = await bcrypt.hash(req.body.password, 10);
    }
    await user.save();
    res.json(user.toPublicJSON());
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'That email or username is already taken.' });
    console.error('❌ Update user error:', err);
    res.status(400).json({ message: err.message || 'Could not update user.' });
  }
});

// DELETE /api/users/:id (Administrator / Manager)
router.delete('/:id', requireAuth, requireRole(...CAN_MANAGE_USERS), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    if (user.isDemoAdmin) return res.status(403).json({ message: 'The demo admin account cannot be deleted.' });
    if (user._id.equals(req.user._id)) return res.status(400).json({ message: 'You cannot delete yourself.' });
    if (user.role === 'Administrator' && req.user.role !== 'Administrator') {
      return res.status(403).json({ message: 'Only an Administrator can delete Administrators.' });
    }
    await user.deleteOne();
    res.json({ message: 'User deleted.' });
  } catch (err) {
    console.error('❌ Delete user error:', err);
    res.status(500).json({ message: 'Could not delete user.' });
  }
});

export default router;
