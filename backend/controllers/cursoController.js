// /controllers/cursoController.js

const db = require('../config/database');

// Função para buscar todos os cursos
exports.getAllCursos = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM cursos ORDER BY nome');
    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar cursos:', err);
    res.status(500).json({ error: 'Erro interno ao buscar os cursos.' });
  }
};