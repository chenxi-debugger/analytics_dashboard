import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// ⛳ 兼容 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ 初始化 express
const app = express();
const PORT = process.env.PORT || 5001;

// ✅ CORS 设置
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-vercel-url.vercel.app',
  'https://your-render-app.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`❌ CORS not allowed: ${origin}`));
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

// ✅ API 路由（按需保留）
import analyticsRouter from './mongoose/routes/analytics.js';
app.use('/api/analytics', analyticsRouter);
// ...其他路由略

// ✅ 静态资源处理（支持前端 React 路由）
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientBuildPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// ✅ 启动服务
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
