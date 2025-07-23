import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';

import userAccountRoutes from './mongoose/routes/userAccount.js'; 
import invoicesRoutes from './mysql/routes/invoices.js'; 
import dashboardRoutes from './mongoose/routes/dashboarddata.js';
import analyticsRouter from './mongoose/routes/analytics.js';
import ecommerceRouter from './mongoose/routes/ecommerce.js';
import crmRouter from './mongoose/routes/crm.js';
import emailRouter from './mongoose/routes/emailRoutes.js';
import chatRoutes from './mongoose/routes/chatRoutes.js'; 


// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const PORT = (typeof process !== 'undefined' && process.env.PORT) || 5001;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/user-account', userAccountRoutes); // MongoDB API route
app.use('/api/dashboarddata', dashboardRoutes);
app.use('/api/analytics', analyticsRouter);
app.use('/api/ecommerce', ecommerceRouter);
app.use('/api/crm', crmRouter);
app.use('/api/email', emailRouter);
app.use('/api/chat', chatRoutes);

app.use('/api/invoices', invoicesRoutes); // MySQL API route

// Serve static files for production build
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
