// /routes/materials.js

const express = require('express');
const router = express.Router();
// Importa todas as funções do controller
const {
  uploadMaterial,
  getAllMaterials,
  getMaterialsByDisciplina
} = require('../controllers/materialController');
const upload = require('../middleware/upload');

// Rota que já existia: POST /api/materials
router.post('/', upload.single('file'), uploadMaterial);

// Rota que já existia: GET /api/materials
router.get('/', getAllMaterials);

// NOVA ROTA: GET /api/materials/disciplina/:disciplinaNome
router.get('/disciplina/:disciplinaNome', getMaterialsByDisciplina);

module.exports = router;
