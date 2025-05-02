const QuestionPaper = require('../models/QuestionPaper');
const fs = require('fs');
const path = require('path');

// Upload a new question paper
exports.uploadQuestionPaper = async (req, res) => {
    try {
        const { title, subject, year, semester } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const questionPaper = new QuestionPaper({
            title,
            subject,
            year,
            semester,
            filePath: file.path,
            uploadedBy: req.user.userId
        });

        await questionPaper.save();
        res.status(201).json(questionPaper);
    } catch (error) {
        console.error('Error uploading question paper:', error);
        res.status(500).json({ message: 'Error uploading question paper' });
    }
};

// Get all question papers
exports.getQuestionPapers = async (req, res) => {
    try {
        const questionPapers = await QuestionPaper.find().populate('uploadedBy', 'name email');
        res.json(questionPapers);
    } catch (error) {
        console.error('Error fetching question papers:', error);
        res.status(500).json({ message: 'Error fetching question papers' });
    }
};

// Get a specific question paper by ID
exports.getQuestionPaperById = async (req, res) => {
    try {
        const questionPaper = await QuestionPaper.findById(req.params.id).populate('uploadedBy', 'name email');
        if (!questionPaper) {
            return res.status(404).json({ message: 'Question paper not found' });
        }
        res.json(questionPaper);
    } catch (error) {
        console.error('Error fetching question paper:', error);
        res.status(500).json({ message: 'Error fetching question paper' });
    }
};

// Download a question paper
exports.downloadQuestionPaper = async (req, res) => {
    try {
        const questionPaper = await QuestionPaper.findById(req.params.id);
        if (!questionPaper) {
            return res.status(404).json({ message: 'Question paper not found' });
        }

        const filePath = path.join(__dirname, '..', questionPaper.filePath);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.download(filePath);
    } catch (error) {
        console.error('Error downloading question paper:', error);
        res.status(500).json({ message: 'Error downloading question paper' });
    }
};