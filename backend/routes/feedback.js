import express from 'express';
import Feedback from '../models/Feedback.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Submit feedback
router.post('/', auth, async (req, res) => {
    try {
        const { rating, comment, category } = req.body;

        const feedback = new Feedback({
            user: req.user.userId,
            rating,
            comment,
            category
        });

        await feedback.save();
        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Error submitting feedback', error: error.message });
    }
});

// Get all feedback
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }

        const feedback = await Feedback.find(query)
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching feedback', error: error.message });
    }
});

// Get feedback by ID
router.get('/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id)
            .populate('user', 'name email');

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching feedback', error: error.message });
    }
});

// Update feedback
router.put('/:id', auth, async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        if (feedback.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to update this feedback' });
        }

        const { rating, comment, category } = req.body;
        feedback.rating = rating;
        feedback.comment = comment;
        feedback.category = category;

        await feedback.save();
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Error updating feedback', error: error.message });
    }
});

// Delete feedback
router.delete('/:id', auth, async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        if (feedback.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to delete this feedback' });
        }

        await Feedback.findByIdAndDelete(req.params.id);
        res.json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting feedback', error: error.message });
    }
});

export default router;