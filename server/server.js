import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import userAccountRoutes from './mongoose/routes/userAccount.js';
import dashboardRoutes from './mongoose/routes/dashboarddata.js';
import analyticsRouter from './mongoose/routes/analytics.js';
import ecommerceRouter from './mongoose/routes/ecommerce.js';
import crmRouter from './mongoose/routes/crm.js';
import emailRouter from './mongoose/routes/emailRoutes.js';
import chatRoutes from './mongoose/routes/chatRoutes.js';

const PORT = process.env.PORT || 5001;
const app = express();

// ✅ CORS: allow frontend from Vercel to access the backend API
app.use(cors({
  origin: 'https://project-4-fullstack-a1fixuvgt-chenxis-projects-9756664d.vercel.app',
  credentials: true,
}));

app.use(express.json());

// ✅ MongoDB Atlas connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ API Routes
app.use('/api/user-account', userAccountRoutes);
app.use('/api/dashboarddata', dashboardRoutes);
app.use('/api/analytics', analyticsRouter);
app.use('/api/ecommerce', ecommerceRouter);
app.use('/api/crm', crmRouter);
app.use('/api/email', emailRouter);
app.use('/api/chat', chatRoutes);

// ❌ Don't serve React front-end from here — it's on Vercel

// ✅ 404 fallback for undefined API routes
app.use((req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
