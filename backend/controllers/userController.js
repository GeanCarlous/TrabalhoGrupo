// /controllers/userController.js
const User = require('../models/User');
const db = require('../config/database');

const getProfile = (req, res) => {
  // Esta rota agora pode ser usada para popular os campos de edição de perfil
  res.json({ user: req.user });
};

// LÓGICA DE ATUALIZAÇÃO DE PERFIL IMPLEMENTADA
const updateProfile = async (req, res) => {
  try {
    const { nome, curso } = req.body;
    const userId = req.user.id; // ID do usuário vem do token JWT

    if (!nome || !curso) {
      return res.status(400).json({ error: 'Nome e curso são obrigatórios.' });
    }

    // Verifica se o curso enviado é válido
    const cursoResult = await db.query('SELECT id FROM cursos WHERE nome = $1', [curso]);
    if (cursoResult.rows.length === 0) {
      return res.status(400).json({ error: `O curso '${curso}' não é válido.` });
    }
    const curso_id = cursoResult.rows[0].id;

    // Atualiza o perfil no banco de dados
    const updatedUser = await User.updateProfile(userId, { nome, curso_id });

    res.json({ message: 'Perfil atualizado com sucesso', user: updatedUser });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ error: 'Erro interno ao atualizar o perfil.' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};