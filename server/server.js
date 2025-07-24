import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import userAccountRoutes from './mongoose/routes/userAccount.js';
import dashboardRoutes from './mongoose/routes/dashboarddata.js';
import analyticsRouter from './mongoose/routes/analytics.js';
import ecommerceRouter from './mongoose/routes/ecommerce.js';
import crmRouter from './mongoose/routes/crm.js';
import emailRouter from './mongoose/routes/emailRoutes.js';
import chatRoutes from './mongoose/routes/chatRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5001;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/api/user-account', userAccountRoutes);
app.use('/api/dashboarddata', dashboardRoutes);
app.use('/api/analytics', analyticsRouter);
app.use('/api/ecommerce', ecommerceRouter);
app.use('/api/crm', crmRouter);
app.use('/api/email', emailRouter);
app.use('/api/chat', chatRoutes);

// Serve frontend static files (Vite build)
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientBuildPath));

// Fallback for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
