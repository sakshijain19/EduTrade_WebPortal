import express from 'express';
import multer from 'multer';
import { 
  createBook,
  getAllBooks,
  getBookById,
  updateBookStatus,
  deleteBook
} from '../controllers/bookController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/books');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Public routes
router.get('/', getAllBooks);
router.get('/:id', getBookById);

// Protected routes
router.post('/', auth, upload.array('images', 5), createBook);
router.patch('/:id/status', auth, updateBookStatus);
router.delete('/:id', auth, deleteBook);

export default router;