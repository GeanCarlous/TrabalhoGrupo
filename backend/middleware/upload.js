// /middleware/upload.js

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Configura o Cloudinary com as credenciais do seu arquivo .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configura o armazenamento do Multer para usar o Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'materiais_estudo', // Nome da pasta onde os arquivos serão salvos no Cloudinary
    allowed_formats: ['pdf', 'png', 'zip', 'docx'],
    
    // --- ESTA É A CORREÇÃO ---
    // Define o tipo de recurso como 'auto' para que o Cloudinary
    // identifique corretamente se é uma imagem, vídeo ou arquivo bruto (como PDF).
    resource_type: 'auto',
  },
});

// Exporta a instância do Multer configurada
const upload = multer({ storage: storage });

module.exports = upload;
