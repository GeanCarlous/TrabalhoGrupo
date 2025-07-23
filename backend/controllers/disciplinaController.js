// /controllers/disciplinaController.js

const Disciplina = require('../models/Disciplina');

// Converte a função para async para poder usar await
exports.getAll = async (req, res) => {
  try {
    // Chama o método getAll do model e espera a resposta
    const disciplinas = await Disciplina.getAll();
    
    // Retorna a lista de disciplinas como JSON
    res.json(disciplinas);

  } catch (err) {
    // Se ocorrer um erro, loga no console e retorna uma mensagem de erro genérica
    console.error('Erro no getAll (Disciplinas):', err);
    res.status(500).json({ error: 'Erro interno ao buscar as disciplinas.' });
  }
};
