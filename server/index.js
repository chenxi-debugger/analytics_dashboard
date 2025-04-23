import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';

import userAccountRoutes from './routes/userAccount.js'; 

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const PORT = (typeof process !== 'undefined' && process.env.PORT) || 5001;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files for production build
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/user-account', userAccountRoutes); // ✅ Hook in your data API

// Test endpoint for client (fake stats for demo)
app.get('/api/stats', async (req, res) => {
  res.json({ visits: 1000, sales: 500 });
});

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the Analytics Dashboard API');
});

// Fallback route for React client SPA
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
