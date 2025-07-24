import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// ✅ 自动兼容 __dirname（ES Modules）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ 初始化 express 应用
const app = express();
const PORT = process.env.PORT || 5001;

// ✅ 安全 CORS 设置
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-vercel-url.vercel.app',
  'https://analytics-dashboard-fullstack.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
      callback(null, true);
    } else {
      console.error(`❌ CORS not allowed for origin: ${origin}`);
      callback(new Error(`CORS not allowed for origin: ${origin}`));
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
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ API 路由（根据你的需要导入）
import analyticsRouter from './mongoose/routes/analytics.js';
import ecommerceRouter from './mongoose/routes/ecommerce.js';
import dashboardRoutes from './mongoose/routes/dashboarddata.js';
import userAccountRoutes from './mongoose/routes/userAccount.js';
import crmRouter from './mongoose/routes/crm.js';
import emailRouter from './mongoose/routes/emailRoutes.js';
import chatRoutes from './mongoose/routes/chatRoutes.js';

app.use('/api/analytics', analyticsRouter);
app.use('/api/ecommerce', ecommerceRouter);
app.use('/api/dashboarddata', dashboardRoutes);
app.use('/api/user-account', userAccountRoutes);
app.use('/api/crm', crmRouter);
app.use('/api/email', emailRouter);
app.use('/api/chat', chatRoutes);

// ✅ 提供前端静态文件（Vite 构建产物）
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientBuildPath));

// ✅ 让前端 React 路由都重定向到 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// ✅ 启动服务器
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
