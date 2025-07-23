// /config/setup.js

const db = require('./database');

const createTablesQueries = `
  -- Descomente a linha abaixo se quiser limpar as tabelas antes de criar
  -- DROP TABLE IF EXISTS users, materials, disciplinas, orientadores, tipos_material, disciplina_orientador CASCADE;

  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS materials (
    id SERIAL PRIMARY KEY,
    titulo TEXT NOT NULL,
    dataObtencao TEXT,
    tipoMaterial TEXT NOT NULL,
    disciplina TEXT NOT NULL,
    orientador TEXT,
    descricao TEXT,
    filePath TEXT NOT NULL,
    fileOriginalName TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS disciplinas (
    id SERIAL PRIMARY KEY,
    nome TEXT UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS orientadores (
    id SERIAL PRIMARY KEY,
    nome TEXT UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS tipos_material (
    id SERIAL PRIMARY KEY,
    nome TEXT UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS disciplina_orientador (
    id SERIAL PRIMARY KEY,
    disciplina_id INTEGER NOT NULL REFERENCES disciplinas(id) ON DELETE CASCADE,
    orientador_id INTEGER NOT NULL REFERENCES orientadores(id) ON DELETE CASCADE
  );
`;

async function setupDatabase() {
  console.log('Iniciando configuração do banco de dados...');
  try {
    await db.query(createTablesQueries);
    console.log('Tabelas criadas com sucesso!');
  } catch (err) {
    console.error('Erro ao criar as tabelas:', err);
  } finally {
    // No pg, a conexão é gerenciada pelo pool, então não precisamos fechar manualmente aqui.
    // Se você estivesse usando um client único, chamaria client.end()
  }
}

setupDatabase();
