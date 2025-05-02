import Note from "../models/Note.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadNote = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const fileUrl = `/uploads/notes/${req.file.filename}`;

    const newNote = new Note({
      title,
      fileUrl,
    });

    await newNote.save();

    res.status(201).json({ message: "Note uploaded successfully", note: newNote });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch notes" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
      .populate('uploadedBy', 'name email')
      .populate('reviews.user', 'name');
      
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error fetching note" });
  }
};

export const downloadNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    
    // Increment download count
    note.downloads += 1;
    await note.save();
    
    // Send file
    res.download(path.join(__dirname, '..', note.fileUrl));
  } catch (error) {
    res.status(500).json({ message: "Error downloading note" });
  }
};

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    
    note.reviews.push({
      user: req.user.userId,
      rating,
      comment
    });
    
    // Update average rating
    const totalRating = note.reviews.reduce((sum, review) => sum + review.rating, 0);
    note.rating = totalRating / note.reviews.length;
    
    await note.save();
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error adding review" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    
    if (note.uploadedBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to delete this note" });
    }
    
    // Delete the physical file
    const filePath = path.join(__dirname, '..', note.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    await Note.deleteOne({ _id: note._id });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note" });
  }
};