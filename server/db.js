import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// connect to mongodb database
export const dbConnect = async () => { 
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
  }
}