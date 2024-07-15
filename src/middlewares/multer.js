const multer = require('multer');
const path = require('path');

// Define storage configuration for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set destination directory for uploaded files
        cb(null, path.resolve(__dirname, '../public/data/uploads'));
    },
    filename: (req, file, cb) => {
        // Set file name format
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Configure Multer upload settings
const upload = multer({
    storage: storage, 
    limits: { fileSize: 30 * 1024 * 1024 } 
});

module.exports = upload; 
