// /routes/materials.js

const express = require("express");
const router = express.Router();

// Importa as funções necessárias do controller
const {
  uploadMaterial,
  findMaterials,
  getMaterialById,
  deleteMaterial,
} = require("../controllers/materialController");

// Importa os middlewares
const upload = require("../middleware/upload");
const { authenticateToken } = require("../middleware/auth");

// Rota para fazer upload de um novo material (PRIVADA)
// A ordem dos middlewares foi corrigida para verificar a autenticação primeiro.
router.post("/", authenticateToken, upload.single("file"), uploadMaterial);

// ROTA UNIFICADA para buscar e filtrar materiais (PRIVADA)
// Exemplos de uso:
// GET /api/materials -> busca todos
// GET /api/materials?search=prova -> busca por título ou orientador
// GET /api/materials?disciplina=Cálculo -> filtra por disciplina
router.get("/", authenticateToken, findMaterials);

// Rota para buscar um material específico pelo ID (PRIVADA)
router.get("/:id", authenticateToken, getMaterialById);

// Rota para apagar um material (PRIVADA)
router.delete("/:id", authenticateToken, deleteMaterial);

module.exports = router;
