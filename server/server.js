import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// ✅ 兼容 ESModule 的 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ 初始化 express 应用
const app = express();
const PORT = process.env.PORT || 5001;

// ✅ 安全但宽容的 CORS 设置
const allowedOrigins = [
  'http://localhost:5173',
  'https://analytics-dashboard-fullstack.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
      callback(null, true);
    } else {
      console.error(`❌ CORS blocked: ${origin}`);
      callback(null, false); // 拒绝但不抛错，防止 500
    }
  },
  credentials: true
}));

// ✅ 中间件
app.use(express.json());

// ✅ MongoDB 连接
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ Connected to MongoDB');
  // First run on an empty database: create roles, permissions and demo users.
  await ensureAuthSeed();
})
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ API 路由（按需保留）
import analyticsRouter from './mongoose/routes/analytics.js';
import ecommerceRouter from './mongoose/routes/ecommerce.js';
import dashboardRoutes from './mongoose/routes/dashboarddata.js';
import userAccountRoutes from './mongoose/routes/userAccount.js';
import crmRouter from './mongoose/routes/crm.js';
import emailRouter from './mongoose/routes/emailRoutes.js';
import chatRoutes from './mongoose/routes/chatRoutes.js';
import authRoutes from './mongoose/routes/auth.js';
import usersRoutes from './mongoose/routes/users.js';
import rolesRoutes from './mongoose/routes/roles.js';
import permissionsRoutes from './mongoose/routes/permissions.js';
import { ensureAuthSeed } from './mongoose/scripts/seedAuthData.js';

app.use('/api/analytics', analyticsRouter);
app.use('/api/ecommerce', ecommerceRouter);
app.use('/api/dashboarddata', dashboardRoutes);
app.use('/api/user-account', userAccountRoutes);
app.use('/api/crm', crmRouter);
app.use('/api/email', emailRouter);
app.use('/api/chat', chatRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/permissions', permissionsRoutes);

// Unknown /api routes return JSON instead of the React page
app.use('/api', (req, res) => res.status(404).json({ message: 'Not found' }));

// ✅ 提供前端构建产物（dist）
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientBuildPath));

// ✅ React Router fallback（保持 Single Page App 正常运行）
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// ✅ 启动服务
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log('✅ Serving frontend from:', clientBuildPath);
});
