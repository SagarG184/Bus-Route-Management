const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/auth');
const routes = require('./routes/routes');
const { initBusSimulation } = require('./utils/busSimulation');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// CORS configuration
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// Socket.IO configuration
const io = socketIo(server, {
    cors: corsOptions
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.warn('MONGODB_URI not found in environment variables, using default connection string');
        }
        
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bus-tracking');
        console.log('Connected to MongoDB');

        // Initialize bus simulation after DB connection
        initBusSimulation(io);
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        console.error('Please ensure MongoDB is running and the connection string is correct');
        process.exit(1);
    }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/routes', routes);

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
