import express from 'express';
import { 
  uploadNote,
  getAllNotes,
  getNoteById,
  downloadNote,
  addReview
} from '../controllers/noteController.js';
import auth from '../middleware/auth.js';
import multer from 'multer';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/notes');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Public routes
router.get('/', getAllNotes);
router.get('/:id', getNoteById);

// Protected routes
router.post('/', auth, upload.single('file'), uploadNote);
router.get('/:id/download', auth, downloadNote);
router.post('/:id/review', auth, addReview);

export default router;