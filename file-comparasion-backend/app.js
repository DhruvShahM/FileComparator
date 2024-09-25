const express = require('express');
const fs = require('fs').promises; // Using promises for async operations
const { diffLines } = require('diff');
const multer = require('multer');
const cors = require('cors');
const upload = multer({ 
  dest: 'uploads/', 
  limits: { fileSize: 5 * 1024 * 1024 } // Limit files to 5 MB
}); 

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// Function to compare two files
const compareFiles = async (filePath1, filePath2) => {
  try {
    // Read the contents of the two files asynchronously
    const [file1, file2] = await Promise.all([
      fs.readFile(filePath1, 'utf-8'),
      fs.readFile(filePath2, 'utf-8')
    ]);

    // Get the differences between the files
    const differences = diffLines(file1, file2);

    // Structure the result for readability

    // Check if files are the same
    const areSame = differences.every(part => !part.added && !part.removed);

    return areSame;
  } catch (error) {
    throw new Error(`Error reading or comparing files: ${error.message}`);
  }
};

// API endpoint to compare two uploaded files
app.post('/POST/compare', upload.array('files', 2), async (req, res) => {
  try {
    if (req.files.length !== 2) {
      return res.status(400).json({ error: 'Please upload exactly two files.' });
    }

    const filePath1 = req.files[0].path; // Path of the first uploaded file
    const filePath2 = req.files[1].path; // Path of the second uploaded file

    const areSame  = await compareFiles(filePath1, filePath2);

    // Response structure
    res.json({
      file1: req.files[0].originalname,
      file2: req.files[1].originalname,
      // differences,
      areSame,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    // Cleanup: Delete the uploaded files
    try {
      await Promise.all(req.files.map(file => fs.unlink(file.path)));
    } catch (cleanupError) {
      console.error('Error cleaning up files:', cleanupError.message);
    }
  }
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
