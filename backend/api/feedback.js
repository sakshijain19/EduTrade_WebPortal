const express = require('express');
const router = express.Router();
const { 
  submitFeedback,
  getAllFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback
} = require('../controllers/feedbackController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', getAllFeedback);
router.get('/:id', getFeedbackById);

// Protected routes
router.post('/', auth, submitFeedback);
router.put('/:id', auth, updateFeedback);
router.delete('/:id', auth, deleteFeedback);

module.exports = router;