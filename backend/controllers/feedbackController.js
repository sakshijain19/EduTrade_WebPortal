// controllers/feedbackController.js
const Feedback = require('../models/Feedback');

/**
 * Get all feedback with optional category filtering
 * @route GET /api/feedback
 */
const getAllFeedback = async (req, res) => {
    try {
        const { category, limit = 10, page = 1 } = req.query;
        let query = {};

        // Add category filter if provided
        if (category) {
            query.category = category;
        }

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const feedback = await Feedback.find(query)
            .populate('user', 'name email')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip(skip);
            
        const total = await Feedback.countDocuments(query);
        
        res.json({ 
            feedback,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching feedback', error: error.message });
    }
};

/**
 * Submit new feedback
 * @route POST /api/feedback
 */
const submitFeedback = async (req, res) => {
    try {
        const { rating, comment, category = 'general' } = req.body;
        
        // Validate required fields
        if (!rating || !comment) {
            return res.status(400).json({ message: 'Rating and comment are required' });
        }
        
        // Validate rating range
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        const feedback = new Feedback({
            user: req.user.userId,
            rating,
            comment,
            category
        });

        await feedback.save();
        
        // Return the feedback with populated user data
        const populatedFeedback = await Feedback.findById(feedback._id)
            .populate('user', 'name email');
            
        res.status(201).json(populatedFeedback);
    } catch (error) {
        res.status(500).json({ message: 'Error submitting feedback', error: error.message });
    }
};

/**
 * Get feedback by ID
 * @route GET /api/feedback/:id
 */
const getFeedbackById = async (req, res) => {
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
};

/**
 * Update feedback
 * @route PUT /api/feedback/:id
 */
const updateFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        // Check if the user is authorized to update this feedback
        if (feedback.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to update this feedback' });
        }

        const { rating, comment, category } = req.body;
        
        // Update only provided fields
        if (rating !== undefined) {
            // Validate rating range
            if (rating < 1 || rating > 5) {
                return res.status(400).json({ message: 'Rating must be between 1 and 5' });
            }
            feedback.rating = rating;
        }
        
        if (comment !== undefined) {
            feedback.comment = comment;
        }
        
        if (category !== undefined) {
            feedback.category = category;
        }

        await feedback.save();
        
        // Return updated feedback with populated user
        const updatedFeedback = await Feedback.findById(feedback._id)
            .populate('user', 'name email');
            
        res.json(updatedFeedback);
    } catch (error) {
        res.status(500).json({ message: 'Error updating feedback', error: error.message });
    }
};

/**
 * Delete feedback
 * @route DELETE /api/feedback/:id
 */
const deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        // Check if the user is authorized to delete this feedback
        if (feedback.user.toString() !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this feedback' });
        }

        await Feedback.findByIdAndDelete(req.params.id);
        res.json({ message: 'Feedback deleted successfully', id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting feedback', error: error.message });
    }
};

/**
 * Get statistics about feedback ratings
 * @route GET /api/feedback/stats
 */
const getFeedbackStats = async (req, res) => {
    try {
        const { category } = req.query;
        let matchStage = {};
        
        if (category) {
            matchStage.category = category;
        }
        
        const stats = await Feedback.aggregate([
            { $match: matchStage },
            { 
                $group: {
                    _id: "$rating",
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        
        // Calculate average rating
        const totalRatings = stats.reduce((acc, curr) => acc + curr.count, 0);
        const ratingSum = stats.reduce((acc, curr) => acc + (curr._id * curr.count), 0);
        const averageRating = totalRatings > 0 ? (ratingSum / totalRatings).toFixed(1) : 0;
        
        // Format stats for easier frontend consumption
        const formattedStats = {
            averageRating: parseFloat(averageRating),
            totalCount: totalRatings,
            distribution: {}
        };
        
        // Initialize all ratings from 1-5
        for (let i = 1; i <= 5; i++) {
            formattedStats.distribution[i] = 0;
        }
        
        // Fill in actual counts
        stats.forEach(stat => {
            formattedStats.distribution[stat._id] = stat.count;
        });
        
        res.json(formattedStats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching feedback statistics', error: error.message });
    }
};

exports = {
    getAllFeedback,
    submitFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
    getFeedbackStats
};