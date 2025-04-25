import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import UserAccount from '../models/UserAccount.js'; // ✅ use the shared model

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load JSON data
const filePath = path.join(__dirname, '../../data/user_account.json');
const rawData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const userAccounts = rawData.pageProps.invoiceData;

// Connect to MongoDB
await mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Insert into DB
try {
  await UserAccount.insertMany(userAccounts);
  console.log("✅ Data inserted using shared UserAccount model");
} catch (err) {
  console.error("❌ Error inserting data:", err);
} finally {
  mongoose.connection.close();
}
