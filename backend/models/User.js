// /models/User.js

const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  /**
   * Cria um novo usuário no banco de dados com senha criptografada.
   * @param {string} email - O email do usuário.
   * @param {string} password - A senha pura (não criptografada) do usuário.
   * @returns {Promise<object>} O objeto do usuário criado (sem a senha).
   */
  static async create(email, password) {
    // Criptografa a senha antes de salvar no banco
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (email, password) 
      VALUES ($1, $2) 
      RETURNING id, email, created_at
    `;
    
    const values = [email, hashedPassword];

    try {
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (err) {
      // Código '23505' é o erro de violação de constraint UNIQUE no PostgreSQL
      if (err.code === '23505') {
        throw new Error('Este email já está cadastrado.');
      }
      // Lança outros erros para serem tratados pelo controller
      throw err;
    }
  }

  /**
   * Busca um usuário pelo email.
   * @param {string} email - O email a ser procurado.
   * @returns {Promise<object|undefined>} O objeto do usuário se encontrado, senão undefined.
   */
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(query, [email]);
    return rows[0];
  }

  /**
   * Valida se a senha fornecida corresponde à senha criptografada.
   * @param {string} plainPassword - A senha pura enviada pelo usuário.
   * @param {string} hashedPassword - A senha criptografada do banco de dados.
   * @returns {Promise<boolean>} True se as senhas corresponderem, senão false.
   */
  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
