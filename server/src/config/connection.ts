import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import authRoutes from '../routes/api/index.js';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 7002;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mymenuDB';

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Database connected.'))
  .catch((error) => console.error('Database connection error:', error));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected.');
    return mongoose.connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed.');
  }
};

export default db;