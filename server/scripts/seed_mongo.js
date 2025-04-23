// server/scripts/seed_mongo.js
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ⬇️ Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ⬇️ Load your JSON data
const filePath = path.join(__dirname, '../data/user_account.json');
const rawData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const invoices = rawData.pageProps.invoiceData;

// ⬇️ Connect to MongoDB
await mongoose.connect('mongodb://localhost:27017/analytics_dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// ⬇️ Define the schema and model
const InvoiceSchema = new mongoose.Schema({
  id: Number,
  issuedDate: String,
  address: String,
  company: String,
  companyEmail: String,
  country: String,
  contact: String,
  name: String,
  service: String,
  total: Number,
  avatar: String,
  avatarColor: String,
  invoiceStatus: String,
  balance: mongoose.Schema.Types.Mixed,
  dueDate: String
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

// ⬇️ Insert data
try {
  await Invoice.insertMany(invoices);
  console.log("✅ Data inserted into MongoDB");
} catch (err) {
  console.error("❌ Error inserting data:", err);
} finally {
  mongoose.connection.close();
}
