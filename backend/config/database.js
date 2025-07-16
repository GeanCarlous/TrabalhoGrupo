const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Erro ao conectar com o banco:', err.message);
  } else {
    console.log('Conectado ao banco SQLite');
  }
});

// Criar tabela de usuários
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);
// Criar tabela de materiais
db.run(`CREATE TABLE IF NOT EXISTS materials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  dataObtencao TEXT,
  tipoMaterial TEXT NOT NULL,
  disciplina TEXT NOT NULL,
  orientador TEXT,
  descricao TEXT,
  filePath TEXT NOT NULL,
  fileOriginalName TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// Tabela de disciplinas
db.run(`CREATE TABLE IF NOT EXISTS disciplinas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT UNIQUE NOT NULL
)`);

// Tabela de orientadores
db.run(`CREATE TABLE IF NOT EXISTS orientadores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT UNIQUE NOT NULL
)`);

// Tabela de tipos de material
db.run(`CREATE TABLE IF NOT EXISTS tipos_material (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT UNIQUE NOT NULL
)`);

// Relação entre disciplinas e orientadores
db.run(`CREATE TABLE IF NOT EXISTS disciplina_orientador (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  disciplina_id INTEGER NOT NULL,
  orientador_id INTEGER NOT NULL,
  FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id),
  FOREIGN KEY (orientador_id) REFERENCES orientadores(id)
)`);


// Fechar conexão quando o processo terminar
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Conexão com o banco fechada.');
    process.exit(0);
  });
});

module.exports = db;
