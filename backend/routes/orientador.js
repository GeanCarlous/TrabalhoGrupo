// /routes/orientador.js

const express = require('express');
const router = express.Router();
const orientadorController = require('../controllers/orientadorController');
const { authenticateToken } = require('../middleware/auth');

// Rota para buscar todos os orientadores (AGORA PRIVADA)
router.get('/', authenticateToken, orientadorController.getAll);


module.exports = router;