import express from 'express';
import { MongoClient } from 'mongodb';

const router = express.Router();
const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'chenxilogs';

const client = new MongoClient(uri);

// GET /api/dashboarddata
router.get('/', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('dashboarddata');

    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error('❌ Failed to fetch dashboarddata:', err);
    res.status(500).json({ error: 'Failed to load dashboard data' });
  }
});

export default router;
