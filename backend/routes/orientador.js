const express = require('express');
const router = express.Router();
const orientadorController = require('../controllers/orientadorController');

router.get('/', orientadorController.getAll);

module.exports = router;