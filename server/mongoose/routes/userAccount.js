import express from 'express';
import UserAccount from '../../mongoose/models/UserAccount.js'; // ✅ Updated import path

const router = express.Router();

// Example GET route
router.get('/', async (req, res) => {
  try {
    const users = await UserAccount.find();
    if (users.length === 0) {
      return res.status(404).json({ message: 'No user accounts found' });
    }
    res.json(users);
  } catch (err) {
    console.error('❌ Error fetching user accounts:', err);
    res.status(500).json({ error: 'Failed to fetch user accounts' });
  }
});

export default router;
