const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

// GET /api/users/profile - Rota protegida
router.get('/profile', authenticateToken, getProfile);

// PUT /api/users/profile - Rota protegida
router.put('/profile', authenticateToken, updateProfile);

module.exports = router;
