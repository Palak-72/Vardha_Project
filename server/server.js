import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { errorMiddleware, notFound } from './middleware/errorMiddleware.js';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';

import contactRoutes from './routes/contactRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import warehouseRoutes from './routes/warehouseRoutes.js';
import authRoutes from './routes/authRoutes.js';
import pricingRoutes from './routes/pricingRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();

const app = express();

// ==================== SECURITY ====================

app.use(helmet());

// ==================== CORS ====================

app.use(cors());

// ==================== RATE LIMIT ====================

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
});

app.use('/api', limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many login attempts, please try again later.',
  },
});

// ==================== MIDDLEWARE ====================

app.use(mongoSanitize());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ==================== HEALTH CHECK ====================

app.use('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Vardha Warehousing API is running',
    timestamp: new Date().toISOString(),
  });
});

// ==================== ROUTES ====================

app.use('/api/contact', contactRoutes);

app.use('/api/enquiries', enquiryRoutes);

app.use('/api/warehouses', warehouseRoutes);

app.use('/api/auth', authLimiter, authRoutes);

app.use('/api/pricing', pricingRoutes);

app.use('/api/admin/dashboard', dashboardRoutes);

app.use('/api/bookings', bookingRoutes);

// ==================== ERROR HANDLING ====================

app.use(notFound);

app.use(errorMiddleware);

// ==================== SERVER ====================

const PORT = Number(process.env.PORT) || 10000;

connectDB()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  });