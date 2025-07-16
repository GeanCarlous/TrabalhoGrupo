const Disciplina = require('../models/Disciplina');

exports.getAll = (req, res) => {
  Disciplina.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar disciplinas.' });
    res.json(rows);
  });
};