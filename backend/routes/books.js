import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Book from '../models/Book.js';
import auth from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/books');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files (jpeg, jpg, png, webp) are allowed!'));
        }
    }
});

// List a new book
router.post('/list', auth, upload.single('image'), async (req, res) => {
    try {
        const {
            title,
            author,
            category,
            condition,
            price,
            location,
            description,
            phone,
            status = 'available'
        } = req.body;

        // Validate required fields
        if (!title || !author || !category || !condition || !price || !location || !description || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate price
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ message: 'Price must be a positive number' });
        }

        // Validate phone number
        if (!/^\+91[0-9]{10}$/.test(phone)) {
            return res.status(400).json({ message: 'Invalid phone number format' });
        }



        if (!req.file) {
            return res.status(400).json({ message: 'Book image is required' });
        }

        const book = new Book({
            title,
            author,
            category,
            condition,
            price: Number(price),
            location,
            description,
            phone,
            status,
            image: `/uploads/books/${req.file.filename}`,
            seller: req.user.userId
        });

        await book.save();
        res.status(201).json(book);
    } catch (error) {
        console.error('Error listing book:', error);
        res.status(500).json({ message: 'Error listing book', error: error.message });
    }
});

// Get all books
router.get('/', async (req, res) => {
    try {
        const { category, condition, minPrice, maxPrice, location, search } = req.query;
        let query = { status: 'available' };

        if (category) query.category = category;
        if (condition) query.condition = condition;
        if (location) query.location = new RegExp(location, 'i');
        if (search) {
            query.$or = [
                { title: new RegExp(search, 'i') },
                { author: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') }
            ];
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const books = await Book.find(query)
            .populate('seller', 'name email')
            .sort({ createdAt: -1 });

        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
});

// Get book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate('seller', 'name email');

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ message: 'Error fetching book', error: error.message });
    }
});

// Update book status (e.g., mark as sold)
router.patch('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.seller.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to update this book' });
        }

        book.status = status;
        await book.save();

        res.json(book);
    } catch (error) {
        console.error('Error updating book status:', error);
        res.status(500).json({ message: 'Error updating book status', error: error.message });
    }
});

// Delete book
router.delete('/:id', auth, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.seller.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to delete this book' });
        }

        await book.remove();
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Error deleting book', error: error.message });
    }
});

// Send message to seller
router.post('/:id/message', auth, async (req, res) => {
    try {
        const { message, buyerPhone } = req.body;
        const book = await Book.findById(req.params.id)
            .populate('seller', 'name email phone');
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        res.json({ 
            message: 'Message sent successfully',
            sellerPhone: book.seller.phone,
            buyerPhone: buyerPhone
        });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error: error.message });
    }
});

export default router;