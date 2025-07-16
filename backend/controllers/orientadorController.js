const orientador = require('../models/Orientador');
const db = require('../config/database');

// Retorna todos os orientadores (já existente)
exports.getAll = (req, res) => {
  orientador.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar orientadores.' });
    res.json(rows);
  });
};

// NOVA FUNÇÃO: Retorna orientadores de uma disciplina específica
exports.getByDisciplina = (req, res) => {
  const { disciplinaId } = req.params;
  db.all(
    `SELECT o.id, o.nome FROM orientadores o
     JOIN disciplina_orientador do ON o.id = do.orientador_id
     WHERE do.disciplina_id = ?`,
    [disciplinaId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Erro ao buscar orientadores.' });
      res.json(rows);
    }
  );
};