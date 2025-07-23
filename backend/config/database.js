// /config/database.js

// Importa o driver do PostgreSQL
const { Pool } = require('pg');

// Importa e configura o dotenv para carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

// Cria um novo pool de conexões usando a URL do banco de dados do .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // A configuração SSL abaixo pode ser necessária para conectar com bancos em produção (como no Render/Heroku)
  // Para desenvolvimento local, você pode comentar ou remover essa parte.
  //ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Mensagem de sucesso ao conectar
pool.on('connect', () => {
  console.log('Conectado com sucesso ao banco de dados PostgreSQL!');
});

// Exportamos um objeto com um método 'query' para ser usado em todo o projeto.
// Isso nos permite executar queries de forma centralizada.
module.exports = {
  query: (text, params) => pool.query(text, params),
};