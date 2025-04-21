require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/stats', async (req, res) => {
  res.json({ visits: 1000, sales: 500 });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

  app.listen(5001, () => {
    console.log('Server running on port 5001');
  });
  
