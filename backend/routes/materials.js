const express = require("express");
const router = express.Router();

// Importa todas as funções necessárias do controller
const {
  uploadMaterial,
  getAllMaterials,
  getMaterialsByDisciplina,
  getMaterialById,
  deleteMaterial,
  findMaterials,
} = require("../controllers/materialController");

// Importa os middlewares
const upload = require("../middleware/upload");
const { authenticateToken } = require("../middleware/auth");

// CORREÇÃO CRÍTICA: Ordem dos middlewares alterada
// Rota para fazer upload de um novo material (PRIVADA)
// POST /api/materials
router.post(
  "/", 
  upload.single("file"), // 1. Processa o upload primeiro
  authenticateToken,     // 2. Autenticação depois
  uploadMaterial
);

// Rota para buscar todos os materiais (PRIVADA)
// GET /api/materials
router.get("/", authenticateToken, findMaterials);

// Rota para buscar materiais por disciplina (PRIVADA)
// GET /api/materials/disciplina/:disciplinaNome
router.get(
  "/disciplina/:disciplinaNome",
  authenticateToken,
  getMaterialsByDisciplina
);

// Rota para buscar um material específico pelo ID (PRIVADA)
// GET /api/materials/:id
router.get("/:id", authenticateToken, getMaterialById);

// Rota para apagar um material (PRIVADA)
router.delete("/:id", authenticateToken, deleteMaterial);

module.exports = router;