import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/api/index.js';
import menuRoutes from './routes/api/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7002;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menus', menuRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
