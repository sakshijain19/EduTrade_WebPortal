import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import QuestionPaper from '../models/QuestionPaper.js';
import auth from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Configure multer for PDF upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/question-papers');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'));
        }
    }
});

// Upload question paper
router.post('/upload', auth, upload.single('file'), async (req, res) => {
    try {
        const { title, subject, course, semester, year } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a PDF file' });
        }

        const questionPaper = new QuestionPaper({
            title,
            subject,
            course,
            semester,
            year,
            fileUrl: `/uploads/question-papers/${req.file.filename}`,
            uploadedBy: req.user.userId
        });

        await questionPaper.save();
        res.status(201).json(questionPaper);
    } catch (error) {
        res.status(500).json({ message: 'Error uploading question paper', error: error.message });
    }
});

// Get all question papers
router.get('/', async (req, res) => {
    try {
        const { subject, course, semester, year, search } = req.query;
        let query = {};

        if (subject) query.subject = subject;
        if (course) query.course = course;
        if (semester) query.semester = Number(semester);
        if (year) query.year = Number(year);
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { subject: { $regex: search, $options: 'i' } }
            ];
        }

        const questionPapers = await QuestionPaper.find(query)
            .populate('uploadedBy', 'name email')
            .sort({ createdAt: -1 });

        res.json(questionPapers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching question papers', error: error.message });
    }
});

// Get question paper by ID
router.get('/:id', async (req, res) => {
    try {
        const questionPaper = await QuestionPaper.findById(req.params.id)
            .populate('uploadedBy', 'name email')
            .populate('reviews.user', 'name');

        if (!questionPaper) {
            return res.status(404).json({ message: 'Question paper not found' });
        }

        res.json(questionPaper);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching question paper', error: error.message });
    }
});

// Download question paper
router.get('/:id/download', auth, async (req, res) => {
    try {
        const questionPaper = await QuestionPaper.findById(req.params.id);
        
        if (!questionPaper) {
            return res.status(404).json({ message: 'Question paper not found' });
        }

        // Increment download count
        questionPaper.downloads += 1;
        await questionPaper.save();

        // Send file
        res.download(path.join(__dirname, '..', questionPaper.fileUrl));
    } catch (error) {
        res.status(500).json({ message: 'Error downloading question paper', error: error.message });
    }
});

// Add review
router.post('/:id/review', auth, async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const questionPaper = await QuestionPaper.findById(req.params.id);

        if (!questionPaper) {
            return res.status(404).json({ message: 'Question paper not found' });
        }

        // Add review
        questionPaper.reviews.push({
            user: req.user.userId,
            rating,
            comment
        });

        // Update average rating
        const totalRating = questionPaper.reviews.reduce((sum, review) => sum + review.rating, 0);
        questionPaper.rating = totalRating / questionPaper.reviews.length;

        await questionPaper.save();
        res.json(questionPaper);
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error: error.message });
    }
});

// Delete question paper
router.delete('/:id', auth, async (req, res) => {
    try {
        const questionPaper = await QuestionPaper.findById(req.params.id);
        
        if (!questionPaper) {
            return res.status(404).json({ message: 'Question paper not found' });
        }

        if (questionPaper.uploadedBy.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to delete this question paper' });
        }

        await QuestionPaper.findByIdAndDelete(req.params.id);
        res.json({ message: 'Question paper deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting question paper', error: error.message });
    }
});

export default router; 