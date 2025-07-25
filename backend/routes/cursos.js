// /routes/cursos.js

const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const { authenticateToken } = require('../middleware/auth');

// Rota para buscar todos os cursos (PRIVADA)
// GET /api/cursos
router.get('/', authenticateToken, cursoController.getAllCursos);

module.exports = router;