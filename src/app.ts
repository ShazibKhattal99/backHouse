import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import userRoutes from './routes';
import connectDB from './db';
import './config/firebase';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/backhouse', userRoutes);

export default app;
