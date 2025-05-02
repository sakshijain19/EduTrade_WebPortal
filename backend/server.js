import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { connectDB, checkDBStatus } from './db.js';
import User from './models/User.js';
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/books.js';
import notesRoutes from './routes/notes.js';
import questionPapersRoutes from './routes/questionPapers.js';
import feedbackRoutes from './routes/feedback.js';
import multer from 'multer';
import fs from 'fs';

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


// Connect to MongoDB
connectDB();

// Test route to check database connection
app.get('/api/test/db', async (req, res) => {
    try {
        const dbStatus = await checkDBStatus();
        res.json(dbStatus);
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            error: error.message,
            stack: error.stack
        });
    }
});

// Test route to create a sample user
app.post('/api/test/user', async (req, res) => {
    try {
        const testUser = new User({
            name: 'Test User',
            email: `test${Date.now()}@example.com`,
            password: 'password123'
        });
        
        const savedUser = await testUser.save();
        res.json({
            message: 'Test user created successfully',
            user: savedUser
        });
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            error: error.message,
            stack: error.stack
        });
    }
});

// Create uploads directories if they don't exist
const uploadsDir = path.join(__dirname, 'uploads');
const booksDir = path.join(uploadsDir, 'books');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
if (!fs.existsSync(booksDir)) {
    fs.mkdirSync(booksDir);
}

// Apply routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/question-papers', questionPapersRoutes);
app.use('/api/feedback', feedbackRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: Object.values(err.errors).map(e => e.message).join(', ')
        });
    }

    // Handle duplicate key errors
    if (err.code === 11000) {
        return res.status(400).json({
            status: 'error',
            message: 'Email already exists'
        });
    }

    // Handle file upload errors
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ 
            message: 'File upload error', 
            error: err.message 
        });
    }

    // Handle other errors
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Something went wrong!'
    });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Environment:', process.env.NODE_ENV);
});