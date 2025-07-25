// /controllers/orientadorController.js

const Orientador = require('../models/Orientador');

// Função que já existia
const getAll = async (req, res) => {
  try {
    const orientadores = await Orientador.getAll();
    res.json(orientadores);
  } catch (err) {
    console.error('Erro no getAll (Orientadores):', err);
    res.status(500).json({ error: 'Erro interno ao buscar os orientadores.' });
  }
};

// Nova função que estava faltando
const getByDisciplina = async (req, res) => {
  try {
    const { disciplinaId } = req.params;
    const orientadores = await Orientador.getByDisciplinaId(disciplinaId);
    res.json(orientadores);
  } catch (err) {
    console.error(`Erro ao buscar orientadores por disciplina:`, err);
    res.status(500).json({ error: 'Erro interno ao buscar os orientadores.' });
  }
};

// Exporta ambas as funções
module.exports = {
  getAll,
  getByDisciplina,
};
