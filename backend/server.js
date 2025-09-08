import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDatabase } from './config/db.js';
import authRoutes from './routes/auth.js';
import itemRoutes from './routes/items.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';

dotenv.config();

const app = express();

// Middleware
// CORS: allow explicit CLIENT_URL list if provided (comma-separated), otherwise allow all origins.
// We do not use cookies for auth, so credentials are disabled to avoid wildcard + credentials conflict.
const allowedOrigins = (process.env.CLIENT_URL || '').split(',').map((o) => o.trim()).filter(Boolean);
app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : true, credentials: false }));
app.options('*', cors({ origin: allowedOrigins.length ? allowedOrigins : true, credentials: false }));
app.use(express.json());
app.use(morgan('dev'));

// Database
await connectDatabase();

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


