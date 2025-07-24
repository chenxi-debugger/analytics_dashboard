import express from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

const router = express.Router();

// 从环境变量中读取 Mongo URI
const uri = process.env.MONGO_URI;
const dbName = 'chenxilogs';

router.get('/', async (req, res) => {
  console.log('📡 [GET] /api/analytics 被访问');
  const client = new MongoClient(uri);

  try {
    console.log('🌐 Connecting to MongoDB...');
    await client.connect();

    const db = client.db(dbName);
    console.log('📁 Using database:', db.databaseName);

    const collection = db.collection('analyticsPageData');
    const data = await collection.findOne({});

    if (!data) {
      console.warn('⚠️ No analytics data found');
      return res.status(404).json({ error: 'Data not found' });
    }

    console.log('✅ Analytics data retrieved');
    res.json(data);
  } catch (err) {
    console.error('❌ MongoDB error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
});

export default router;
