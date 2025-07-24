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

// ----------- ⛳ __dirname 兼容 (ESModules中) ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----------- ✅ Express app 初始化 ----------
const app = express();
const PORT = process.env.PORT || 5001;

// ----------- ✅ 允许 CORS 来自多个 origin ----------
const allowedOrigins = [
  'http://localhost:5173',
  'https://project-4-fullstack-a1fixuvgt-chenxis-projects-9756664d.vercel.app',
  'https://analytics-dashboard-fullstack.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS not allowed for origin: ${origin}`));
    }
  },
  credentials: true
}));

// ----------- ✅ 中间件 ----------
app.use(express.json());

// ----------- ✅ MongoDB 连接 ----------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ----------- ✅ API 路由 ----------
app.use('/api/user-account', userAccountRoutes);
app.use('/api/dashboarddata', dashboardRoutes);
app.use('/api/analytics', analyticsRouter);
app.use('/api/ecommerce', ecommerceRouter);
app.use('/api/crm', crmRouter);
app.use('/api/email', emailRouter);
app.use('/api/chat', chatRoutes);

// ----------- ✅ 静态文件服务（给 Render 用） ----------
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientBuildPath));

// ----------- ✅ React Router fallback ----------
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// ----------- ✅ 启动服务 ----------
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
