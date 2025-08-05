import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../../data/invoice.json');
const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const invoices = jsonData.pageProps.apiClientData;

const run = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chenxi2025!', 
    database: 'client_data'
  });

  for (const invoice of invoices) {
    const { name, address, company, country, contact, companyEmail } = invoice;
    await connection.execute(
      `INSERT INTO invoices (name, address, company, country, contact, company_email)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, address, company, country, contact, companyEmail]
    );
  }

  console.log('✅ Invoices inserted into MySQL!');
  await connection.end();
};

run().catch(err => {
  console.error('❌ Error inserting invoices:', err);
});
