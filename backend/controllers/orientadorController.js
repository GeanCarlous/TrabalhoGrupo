// /controllers/orientadorController.js

const Orientador = require('../models/Orientador');


const getAll = async (req, res) => {
  try {
    const orientadores = await Orientador.getAll();
    res.json(orientadores);
  } catch (err) {
    console.error('Erro no getAll (Orientadores):', err);
    res.status(500).json({ error: 'Erro interno ao buscar os orientadores.' });
  }
};


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


module.exports = {
  getAll,
  getByDisciplina,
};
