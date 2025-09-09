import mongoose from 'mongoose';
import { Router } from 'express';

const router = Router();

router.get('/health', async (req, res, next) => {
  try {
    // Lightweight query to keep MongoDB Atlas connection alive
    await mongoose.connection.db.stats();
    res.status(200).json({ status: 'ok', message: 'Backend and database are healthy' });
  } catch (error) {
    // Pass to errorHandler middleware
    next(error);
  }
});

export default router;