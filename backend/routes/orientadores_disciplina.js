const express = require('express');
const router = express.Router();
const orientadorController = require('../controllers/orientadorController');

router.get('/por-disciplina/:disciplinaId', orientadorController.getByDisciplina);

module.exports = router;