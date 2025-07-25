// /models/User.js
const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  // MÉTODO CREATE SIMPLIFICADO
  static async create(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Note que não inserimos 'nome' ou 'curso_id', eles usarão os valores padrão do banco.
    const query = `
      INSERT INTO users (email, password) 
      VALUES ($1, $2) 
      RETURNING id, nome, email, curso_id, created_at
    `;
    const values = [email, hashedPassword];
    try {
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (err) {
      if (err.code === '23505') {
        throw new Error('Este email já está cadastrado.');
      }
      throw err;
    }
  }

  // NOVO MÉTODO PARA ATUALIZAR O PERFIL
  static async updateProfile(userId, { nome, curso_id }) {
    const query = `
      UPDATE users 
      SET nome = $1, curso_id = $2 
      WHERE id = $3
      RETURNING id, nome, email, curso_id
    `;
    const values = [nome, curso_id, userId];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

 // MÉTODO ATUALIZADO: Agora busca o nome do curso
  static async findByEmail(email) {
    const query = `
      SELECT u.id, u.nome, u.email, u.password, u.curso_id, c.nome AS curso_nome
      FROM users AS u
      LEFT JOIN cursos AS c ON u.curso_id = c.id
      WHERE u.email = $1
    `;
    const { rows } = await db.query(query, [email]);
    return rows[0];
  }

  // NOVO MÉTODO: Para buscar o perfil completo pelo ID
  static async findById(id) {
    const query = `
      SELECT u.id, u.nome, u.email, u.curso_id, c.nome AS curso_nome
      FROM users AS u
      LEFT JOIN cursos AS c ON u.curso_id = c.id
      WHERE u.id = $1
    `;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
