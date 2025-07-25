// /routes/materials.js

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
const { find } = require("../models/Material");

// Rota para fazer upload de um novo material (PRIVADA)
// POST /api/materials
router.post("/", authenticateToken, upload.single("file"), uploadMaterial);

// Rota para buscar todos os materiais (PRIVADA)
// GET /api/materials
// router.get('/', authenticateToken, getAllMaterials); // Remover esta linha
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

// NOVA ROTA: Rota para apagar um material (PRIVADA)
router.delete("/:id", authenticateToken, deleteMaterial);

module.exports = router;
