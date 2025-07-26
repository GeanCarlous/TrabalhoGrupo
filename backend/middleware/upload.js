// /middleware/upload.js

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Configura o Cloudinary com as credenciais do seu ficheiro .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configura o armazenamento do Multer para usar o Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder;
    let resource_type;

    if (file.mimetype.startsWith('image/')) {
      folder = 'materiais_estudo/imagens';
      resource_type = 'image';
    } else {
      // Para outros tipos de ficheiro como .pdf, .zip, .docx
      folder = 'materiais_estudo/documentos';
      resource_type = 'raw';
    }

    // Retorna os parâmetros de upload para o Cloudinary
    return {
      folder: folder,
      resource_type: resource_type,
    };
  },
});

// Exporta a instância do Multer configurada com o limite de tamanho
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 Megabytes
});

module.exports = upload;
