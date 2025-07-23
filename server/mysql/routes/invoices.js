// invoices.js
import express from 'express';
import mysql from 'mysql2/promise';

const router = express.Router();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
});

// GET /api/invoices
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM invoice');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;