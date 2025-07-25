// /middleware/upload.js

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // ... (sua lógica de resource_type e folder)
    let folder;
    let resource_type;
    if (file.mimetype.startsWith('image/')) {
      folder = 'materiais_estudo/imagens';
      resource_type = 'image';
    } else {
      folder = 'materiais_estudo/documentos';
      resource_type = 'raw';
    }
    return {
      folder: folder,
      resource_type: resource_type,
    };
  },
});

// Adiciona a opção 'limits' para definir o tamanho máximo do ficheiro
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 Megabytes
});

module.exports = upload;
