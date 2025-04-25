import fs from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load dashboard_data.json
const filePath = path.join(__dirname, '../../data/dashboard_data.json');
const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const dashboarddata = jsonData.pageProps.apiPricingPlanData;

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'chenxilogs'; 

const insertDashboardData = async () => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('dashboarddata'); 

    // Optional: clear old data
    await collection.deleteMany({});

    const result = await collection.insertMany(dashboarddata);
    console.log(`✅ Inserted ${result.insertedCount} dashboard items into MongoDB.`);
  } catch (error) {
    console.error('❌ Failed to insert dashboard data:', error);
  } finally {
    await client.close();
  }
};

insertDashboardData();
