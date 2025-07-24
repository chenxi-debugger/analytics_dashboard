import express from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

const router = express.Router();
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/chenxilogs';

const dbName = 'chenxilogs';

// Fetch all email data (emails, tabs, labels)
router.get('/', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('emailData');
    const data = await collection.findOne({});
    if (!data) return res.status(404).json({ error: 'Email data not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});

// Fetch emails array
router.get('/emails', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('emailData');
    const data = await collection.findOne({});
    if (!data || !data.emails) return res.status(404).json({ error: 'Emails not found' });
    res.json(data.emails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});

// Fetch tabs array
router.get('/tabs', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('emailData');
    const data = await collection.findOne({});
    if (!data || !data.tabs) return res.status(404).json({ error: 'Tabs not found' });
    res.json(data.tabs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});

// Fetch labels array
router.get('/labels', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('emailData');
    const data = await collection.findOne({});
    if (!data || !data.labels) return res.status(404).json({ error: 'Labels not found' });
    res.json(data.labels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});

export default router;