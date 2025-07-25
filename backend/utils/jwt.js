// /utils/jwt.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Adiciona uma verificação para garantir que a chave secreta foi carregada do .env
if (!JWT_SECRET) {
  throw new Error('ERRO FATAL: A variável JWT_SECRET não está definida no arquivo .env');
}

/**
 * Gera um token JWT.
 * @param {object} payload - Os dados para incluir no token (ex: { id, email }).
 * @returns {string} O token JWT gerado.
 */
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token expira em 1 hora
};

/**
 * Verifica e decodifica um token JWT.
 * @param {string} token - O token JWT a ser verificado.
 * @returns {object} O payload decodificado do token.
 */
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
