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
    // Determina tipo e pasta baseado no MIME Type
    const isImage = file.mimetype.startsWith('image/');
    const folder = isImage 
      ? 'materiais_estudo/imagens' 
      : 'materiais_estudo/documentos';
    
    // Extrai extensão original (crucial para PDFs!)
    const extension = file.originalname.split('.').pop();
    
    return {
      folder: folder,
      resource_type: isImage ? 'image' : 'raw',
      public_id: `${Date.now()}-${file.originalname}`, // Nome original + timestamp
      format: isImage ? undefined : extension, // Força extensão para RAW
      allowed_formats: isImage ? ['jpg', 'jpeg', 'png', 'gif'] : ['pdf', 'zip', 'docx'] // Opcional
    };
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

module.exports = upload;