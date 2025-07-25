// /middleware/upload.js

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Log para depuração do tipo de arquivo
    console.log("Mimetype recebido:", file.mimetype);
    const ext = file.originalname.split(".").pop().toLowerCase();
    let folder;
    let resource_type;
    // Força o tipo pelo nome do arquivo, não só pelo mimetype
    if (
      file.mimetype.startsWith("image/") ||
      ["jpg", "jpeg", "png", "gif", "webp"].includes(ext)
    ) {
      folder = "materiais_estudo/imagens";
      resource_type = "image";
    } else {
      folder = "materiais_estudo/documentos";
      resource_type = "raw";
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
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 Megabytes
});

module.exports = upload;
