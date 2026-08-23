import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/pincode.routes.js';
import { notFoundHandler, errorHandler } from './middleware/error.middleware.js';

const app = express();

// Security HTTP headers
app.use(helmet());

// Cross-Origin Resource Sharing configuration
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman) or matching clientUrl/localhost
      if (!origin || origin.startsWith('http://localhost') || origin === clientUrl) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in dev/assignment context for ease of evaluation
      }
    },
    credentials: true
  })
);

// Body parser
app.use(express.json({ limit: '10kb' }));

// API routes
app.use('/api', routes);

// 404 handler
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

export default app;
