// /controllers/tipomaterialController.js

const TipoMaterial = require('../models/TipoMaterial');

// Converte a função para async para poder usar await
exports.getAll = async (req, res) => {
  try {
    // Chama o método getAll do model e espera a resposta
    const tipos = await TipoMaterial.getAll();
    
    // Retorna a lista de tipos de material como JSON
    res.json(tipos);

  } catch (err) {
    // Se ocorrer um erro, loga no console e retorna uma mensagem de erro genérica
    console.error('Erro no getAll (Tipos de Material):', err);
    res.status(500).json({ error: 'Erro interno ao buscar os tipos de material.' });
  }
};
