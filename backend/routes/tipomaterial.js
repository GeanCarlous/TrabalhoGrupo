// /routes/tipomaterial.js

const express = require("express");
const router = express.Router();
const tipoMaterialController = require("../controllers/tipomaterialController");
const { authenticateToken } = require('../middleware/auth');

// Rota para buscar todos os tipos de material (AGORA PRIVADA)
router.get("/", authenticateToken, tipoMaterialController.getAll);

module.exports = router;
