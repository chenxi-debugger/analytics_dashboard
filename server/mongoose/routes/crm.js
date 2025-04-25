import express from 'express';
   import { MongoClient } from 'mongodb';
   import 'dotenv/config';

   const router = express.Router();
   const uri = process.env.MONGO_URI;
   const dbName = 'chenxilogs';

   router.get('/', async (req, res) => {
     const client = new MongoClient(uri);
     try {
       await client.connect();
       const db = client.db(dbName);
       const collection = db.collection('crmPageData');
       const data = await collection.findOne({});
       if (!data) return res.status(404).json({ error: 'Data not found' });
       res.json(data);
     } catch (err) {
       res.status(500).json({ error: err.message });
     } finally {
       await client.close();
     }
   });

   export default router;