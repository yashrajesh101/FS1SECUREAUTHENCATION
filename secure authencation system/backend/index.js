const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

dotenv.config();
require('./Models/db');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json()); // Replaces body-parser
app.use(cors({
    origin: '*', // Change this to specific domains in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Health Check Endpoint
app.get('/ping', (req, res) => res.send('PONG'));

// Routes
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

// Handle 404 - Route Not Found
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('🔥 Server Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start Server
const server = app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});

// Graceful Shutdown
process.on('SIGINT', () => {
    server.close(() => {
        console.log('🔴 Server shutdown gracefully');
        process.exit(0);
    });
});
