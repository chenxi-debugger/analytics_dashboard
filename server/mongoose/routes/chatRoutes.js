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

// Create a new chat
router.post('/chats', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('chatData');
    const chat = req.body;
    chat.id = Date.now(); // Simple ID generation
    const result = await collection.updateOne(
      {},
      { $push: { chats: chat } },
      { upsert: true }
    );
    if (result.matchedCount === 0 && result.upsertedCount === 0) {
      return res.status(500).json({ error: 'Failed to create chat' });
    }
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});

// Send a message (update chat)
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
    const updatedData = await collection.findOne({});
    const updatedChat = updatedData.chats.find((c) => c.id === chatId);
    res.json(updatedChat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});

// Update chat (e.g., unread count)
router.put('/chats/:id', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('chatData');
    const chatId = parseInt(req.params.id);
    const updates = req.body;

    const result = await collection.updateOne(
      { 'chats.id': chatId },
      { $set: { 'chats.$': { ...updates, id: chatId } } }
    );

    if (result.matchedCount === 0) return res.status(404).json({ error: 'Chat not found' });
    const updatedData = await collection.findOne({});
    const updatedChat = updatedData.chats.find((c) => c.id === chatId);
    res.json(updatedChat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});

// Delete a chat
router.delete('/chats/:id', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('chatData');
    const chatId = parseInt(req.params.id);

    const result = await collection.updateOne(
      {},
      { $pull: { chats: { id: chatId } } }
    );

    if (result.modifiedCount === 0) return res.status(404).json({ error: 'Chat not found' });
    res.json({ message: 'Chat deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});

// Create a new contact
router.post('/contacts', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('chatData');
    const contact = req.body;
    contact.id = Date.now(); // Simple ID generation
    const result = await collection.updateOne(
      {},
      { $push: { contacts: contact } },
      { upsert: true }
    );
    if (result.matchedCount === 0 && result.upsertedCount === 0) {
      return res.status(500).json({ error: 'Failed to create contact' });
    }
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});

// Delete a contact
router.delete('/contacts/:id', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('chatData');
    const contactId = parseInt(req.params.id);

    const result = await collection.updateOne(
      {},
      { $pull: { contacts: { id: contactId } } }
    );

    if (result.modifiedCount === 0) return res.status(404).json({ error: 'Contact not found' });
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});

export default router;