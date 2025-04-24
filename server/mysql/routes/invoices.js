import express from 'express';
import mysql from 'mysql2/promise';

const router = express.Router();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Chenxi2025!', 
  database: 'client_data'
});

// GET /api/clients
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM invoice');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
