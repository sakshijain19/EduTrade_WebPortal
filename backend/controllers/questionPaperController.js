import path from 'path';
import fs from 'fs';

export const downloadQuestionPaper = (req, res) => {
  const paperId = req.params.id;

  // You'll need a way to map ID to filePath – usually from DB. For now, hardcoded for testing:
  // Example: You might look up this info in MongoDB or another store.
  
  // Simulate data for now:
  const filePath = path.resolve('uploads/questionPaper/computerEngineering/sem-8/hpc/Feb - 2023.pdf');

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('File not found:', filePath);
      return res.status(404).json({ message: 'File not found' });
    }

    return res.download(filePath, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Failed to download file');
      }
    });
  });
};
