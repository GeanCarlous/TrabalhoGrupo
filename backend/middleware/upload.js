const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.png', '.pdf', '.zip', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) cb(null, true);
  else cb(new Error('Formato de arquivo não suportado'), false);
};

module.exports = require('multer')({ storage, fileFilter });