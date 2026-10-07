import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Role from '../models/Role.js';
import { signToken, requireAuth } from '../../middleware/auth.js';

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sends back the token plus the user and their role's module permissions.
async function authResponse(user) {
  const role = await Role.findOne({ name: user.role });
  return {
    token: signToken(user),
    user: user.toPublicJSON(),
    permissions: role ? role.permissions : [],
  };
}

// POST /api/auth/register  { fullName, username, email, password }
router.post('/register', async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body || {};
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    if (!EMAIL_RE.test(email)) return res.status(400).json({ message: 'Please enter a valid email.' });
    if (password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters.' });

    const exists = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    });
    if (exists) return res.status(409).json({ message: 'That email or username is already taken.' });

    const passwordHash = await bcrypt.hash(password, 10);
    // New sign-ups always start with the least-privileged role.
    const user = await User.create({ fullName, username, email, passwordHash, role: 'Subscriber' });
    return res.status(201).json(await authResponse(user));
  } catch (err) {
    console.error('❌ Register error:', err);
    return res.status(500).json({ message: 'Registration failed.' });
  }
});

// POST /api/auth/login  { email, password }   (email field also accepts a username)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });

    const login = email.toLowerCase().trim();
    const user = await User.findOne({ $or: [{ email: login }, { username: login }] }).select('+passwordHash');
    // Same message for "no such user" and "wrong password", so we don't reveal which emails exist.
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Incorrect email or password.' });
    }
    if (user.status === 'inactive') return res.status(403).json({ message: 'This account is inactive.' });

    return res.json(await authResponse(user));
  } catch (err) {
    console.error('❌ Login error:', err);
    return res.status(500).json({ message: 'Login failed.' });
  }
});

// GET /api/auth/me — who am I? (used to restore the session on page reload)
router.get('/me', requireAuth, async (req, res) => {
  const role = await Role.findOne({ name: req.user.role });
  res.json({ user: req.user.toPublicJSON(), permissions: role ? role.permissions : [] });
});

// PUT /api/auth/me — update my own profile (never my role or status)
router.put('/me', requireAuth, async (req, res) => {
  try {
    const allowed = ['fullName', 'username', 'email', 'contact', 'company', 'country', 'language', 'plan', 'billing',
      'notificationPrefs'];
    if (req.user.isDemoAdmin && (req.body.email !== undefined || req.body.username !== undefined)) {
      const changingEmail = req.body.email !== undefined && req.body.email.toLowerCase() !== req.user.email;
      const changingUsername = req.body.username !== undefined && req.body.username.toLowerCase() !== req.user.username;
      if (changingEmail || changingUsername) {
        return res.status(403).json({ message: 'The shared demo account’s email and username are locked.' });
      }
    }
    if (req.body.email !== undefined && !EMAIL_RE.test(req.body.email)) {
      return res.status(400).json({ message: 'Please enter a valid email.' });
    }
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) req.user[key] = req.body[key];
    });
    if (req.body.notificationPrefs !== undefined) req.user.markModified('notificationPrefs');
    await req.user.save();
    res.json({ user: req.user.toPublicJSON() });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'That email or username is already taken.' });
    console.error('❌ Update profile error:', err);
    res.status(400).json({ message: err.message || 'Could not update profile.' });
  }
});

// DELETE /api/auth/me  { confirm: true } — delete my own account
router.delete('/me', requireAuth, async (req, res) => {
  if (req.user.isDemoAdmin) return res.status(403).json({ message: 'The shared demo account cannot be deleted.' });
  if (!req.body || req.body.confirm !== true) return res.status(400).json({ message: 'Please confirm account deletion.' });
  await req.user.deleteOne();
  return res.json({ message: 'Account deleted.' });
});

// PUT /api/auth/password  { currentPassword, newPassword }
router.put('/password', requireAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body || {};
    if (!currentPassword || !newPassword) return res.status(400).json({ message: 'Both passwords are required.' });
    if (newPassword.length < 8) return res.status(400).json({ message: 'New password must be at least 8 characters.' });
    if (req.user.isDemoAdmin) {
      return res.status(403).json({ message: 'The shared demo account password cannot be changed.' });
    }

    const user = await User.findById(req.user._id).select('+passwordHash');
    if (!(await bcrypt.compare(currentPassword, user.passwordHash))) {
      return res.status(400).json({ message: 'Current password is incorrect.' });
    }
    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password updated.' });
  } catch (err) {
    console.error('❌ Change password error:', err);
    res.status(500).json({ message: 'Could not change password.' });
  }
});

// POST /api/auth/forgot-password  { email }
// This demo has no email service, so we only validate the input and always reply the same way
// (never revealing whether an account exists).
router.post('/forgot-password', (req, res) => {
  const { email } = req.body || {};
  if (!email || !EMAIL_RE.test(email)) return res.status(400).json({ message: 'Please enter a valid email.' });
  return res.json({ message: 'If an account exists for that email, a reset link has been sent.' });
});

export default router;
