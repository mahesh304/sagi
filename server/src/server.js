require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { connectDatabase } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middlewares
const origin = process.env.ORIGIN || process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

// Static uploads
const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

// Health
app.get('/api/health', (req, res) => {
	res.json({ ok: true, uptime: process.uptime() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// 404 + Error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDatabase(process.env.MONGO_URI)
	.then(() => {
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	})
	.catch((err) => {
		console.error('Failed to connect DB', err);
		process.exit(1);
	});