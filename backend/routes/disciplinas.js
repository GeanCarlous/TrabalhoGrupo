// /routes/disciplinas.js

const express = require('express');
const router = express.Router();
const disciplinaController = require('../controllers/disciplinaController');
const { authenticateToken } = require('../middleware/auth');

// Rota para buscar todas as disciplinas (AGORA PRIVADA)
router.get('/', authenticateToken, disciplinaController.getAll);

module.exports = router;
