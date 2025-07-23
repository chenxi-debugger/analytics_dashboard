import express from 'express';
import pool from '../config.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log('Environment variables:', {
      MYSQL_HOST: process.env.MYSQL_HOST,
      MYSQL_PORT: process.env.MYSQL_PORT
    });
    console.log('Querying database with pool:', pool);
    const [rows] = await pool.query('SELECT * FROM invoice');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching invoices:', error.code, error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;