const express = require('express');
const router = express.Router();
const multer = require('multer');
const { connectDatabase, fetchData } = require('../controllers/dbController');

const upload = multer({ dest: 'uploads/' });

// Upload service account and connect to database
router.post('/upload-config', upload.single('serviceAccount'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const dbType = req.body.dbType; // 'firebase', 'aws', 'gcp'
    
    await connectDatabase(dbType, filePath);
    res.json({ success: true, message: 'Connected successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch data from connected database
router.get('/fetch-data', async (req, res) => {
  try {
    const { collection } = req.query;
    const data = await fetchData(collection);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;