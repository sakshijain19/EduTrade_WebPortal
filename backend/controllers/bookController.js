const Book = require('../models/Book');

// Create a new book listing
exports.createBook = async (req, res) => {
    try {
        const { title, description, price, condition, subject } = req.body;
        const images = req.files ? req.files.map(file => file.path) : [];

        const book = new Book({
            title,
            description,
            price,
            condition,
            subject,
            images,
            seller: req.user.userId
        });

        await book.save();
        res.status(201).json(book);
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ message: 'Error creating book listing' });
    }
};

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('seller', 'name email');
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Error fetching books' });
    }
};

// Get a specific book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('seller', 'name email');
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ message: 'Error fetching book' });
    }
};

// Update book status
exports.updateBookStatus = async (req, res) => {
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
        res.status(500).json({ message: 'Error updating book status' });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
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
        res.status(500).json({ message: 'Error deleting book' });
    }
};