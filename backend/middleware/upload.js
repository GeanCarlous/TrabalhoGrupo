// /middleware/upload.js

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Configuração robusta do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true // Força HTTPS
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith('image/');
    const folder = isImage 
      ? 'materiais_estudo/imagens' 
      : 'materiais_estudo/documentos';
    
    // Nome do arquivo seguro
    const originalName = file.originalname.replace(/[^a-zA-Z0-9\.]/g, '_');
    const publicId = `${Date.now()}-${originalName.split('.').slice(0, -1).join('.')}`;
    const extension = originalName.split('.').pop();
    
    return {
      folder: folder,
      resource_type: isImage ? 'image' : 'raw',
      public_id: publicId, // Garantido para reconstrução
      format: isImage ? undefined : extension,
      allowed_formats: isImage ? ['jpg', 'jpeg', 'png', 'gif'] : ['pdf', 'zip', 'docx'],
      overwrite: false,
      unique_filename: true,
      use_filename: true
    };
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    // Validação adicional de tipos de arquivo
    const validTypes = [
      'image/jpeg', 'image/png', 
      'application/pdf', 
      'application/zip',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (validTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não suportado'), false);
    }
  }
});

module.exports = upload;