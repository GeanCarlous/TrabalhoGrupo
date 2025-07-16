const express = require('express');
const router = express.Router();
const disciplinaController = require('../controllers/disciplinaController');

router.get('/', disciplinaController.getAll);

module.exports = router;