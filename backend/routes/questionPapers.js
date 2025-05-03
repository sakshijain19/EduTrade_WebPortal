import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// 📁 Download route (updated)
router.get('/download/:branch/:semester/:subject/:filename', (req, res) => {
    const { branch, semester, subject, filename } = req.params;

    const filePath = path.join(
        __dirname,
        '..',
        'uploads',
        'questionPaper',
        branch,
        semester,
        subject,
        filename
    );

    res.download(filePath, (err) => {
        if (err) {
            console.error('Download error:', err);
            res.status(404).send('File not found!');
        }
    });
});

export default router;
