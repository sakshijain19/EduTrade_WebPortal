import express from 'express';
import multer from 'multer';
import path from 'path';
import Note from '../models/Note.js';
import auth from '../middleware/auth.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path'; // <-- Add this line
import fs from 'fs';

const router = express.Router();

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create uploads/notes directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
const notesDir = path.join(uploadsDir, 'notes');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
if (!fs.existsSync(notesDir)) {
  fs.mkdirSync(notesDir);
}

// Configure multer for PDF upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, notesDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB max
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.pdf', '.doc', '.docx'].includes(ext)) cb(null, true);
    else cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
  }
});

// Upload note (protected)
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    const { title, subject, course, semester } = req.body;
    
    // Check for all required fields
    if (!title) return res.status(400).json({ message: 'Title is required' });
    // if (!description) return res.status(400).json({ message: 'Description is required' }); // REMOVE THIS LINE
    if (!subject) return res.status(400).json({ message: 'Subject is required' });
    if (!course) return res.status(400).json({ message: 'Course is required' });
    if (!semester) return res.status(400).json({ message: 'Semester is required' });
    if (!req.file) return res.status(400).json({ message: 'File is required' });

    const fileUrl = `/uploads/notes/${req.file.filename}`;
    const note = new Note({ 
      title, 
      // description, // REMOVE THIS LINE
      subject, 
      course, 
      semester: Number(semester), // Convert to Number
      fileUrl, 
      uploadedBy: req.user.userId 
    });
    
    await note.save();

    res.status(201).json({ message: 'Note uploaded successfully', note });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
});

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Error fetching notes' });
  }
});

// Search notes
router.get('/search', async (req, res) => {
  try {
    const { term } = req.query;
    const searchQuery = term 
      ? { 
          $or: [
            { title: { $regex: term, $options: 'i' } },
            { description: { $regex: term, $options: 'i' } },
            { subject: { $regex: term, $options: 'i' } },
            { course: { $regex: term, $options: 'i' } }
          ] 
        } 
      : {};

    const notes = await Note.find(searchQuery).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ message: 'Error searching notes' });
  }
});

// Get note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
      .populate('uploadedBy', 'name email')
      .populate('reviews.user', 'name');

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching note', error: error.message });
  }
});

// Download note
router.get('/:id/download', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Increment download count
    note.downloads += 1;
    await note.save();

    // Send file
    res.download(path.join(__dirname, '..', note.fileUrl));
  } catch (error) {
    res.status(500).json({ message: 'Error downloading note', error: error.message });
  }
});

// Add review
router.post('/:id/review', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Add review
    note.reviews.push({
      user: req.user.userId,
      rating,
      comment
    });

    // Update average rating
    const totalRating = note.reviews.reduce((sum, review) => sum + review.rating, 0);
    note.rating = totalRating / note.reviews.length;

    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error: error.message });
  }
});

// Delete note
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.uploadedBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this note' });
    }

    // Delete the physical file
    const filePath = path.join(__dirname, '..', note.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Use deleteOne instead of remove (which is deprecated)
    await Note.deleteOne({ _id: note._id });
    
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note', error: error.message });
  }
});

export default router;