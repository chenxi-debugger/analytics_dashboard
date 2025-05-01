import express from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

const router = express.Router();
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/chenxilogs';
const dbName = 'chenxilogs';

// Fetch all chat data (chats, contacts)
router.get('/', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('chatData');
    const data = await collection.findOne({});
    if (!data) return res.status(404).json({ error: 'Chat data not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});

// Fetch chats array
router.get('/chats', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('chatData');
    const data = await collection.findOne({});
    if (!data || !data.chats) return res.status(404).json({ error: 'Chats not found' });
    res.json(data.chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});

// Fetch contacts array
router.get('/contacts', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('chatData');
    const data = await collection.findOne({});
    if (!data || !data.contacts) return res.status(404).json({ error: 'Contacts not found' });
    res.json(data.contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});

// Send a message (for future persistence)
router.post('/send', async (req, res) => {
  const { chatId, message } = req.body;
  if (!chatId || !message) return res.status(400).json({ error: 'chatId and message are required' });

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('chatData');

    const result = await collection.updateOne(
      { 'chats.id': chatId },
      {
        $push: { 'chats.$.messages': message },
        $set: {
          'chats.$.snippet': message.content,
          'chats.$.time': new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        },
      }
    );

    if (result.matchedCount === 0) return res.status(404).json({ error: 'Chat not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});

export default router;