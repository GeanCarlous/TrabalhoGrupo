const express = require('express');
const router = express.Router();
const orientadorController = require('../controllers/orientadorController');
const { authenticateToken } = require('../middleware/auth'); // 1. Importar o middleware

// 2. Adicionar o 'authenticateToken' para proteger a rota
router.get('/por-disciplina/:disciplinaId', authenticateToken, orientadorController.getByDisciplina);

module.exports = router;
