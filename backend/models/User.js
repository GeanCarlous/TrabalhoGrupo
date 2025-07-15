const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(email, senha) {
    console.log('Criando usuário:', email, senha);
    
    return new Promise(async (resolve, reject) => {
      try {
        const hashedPassword = await bcrypt.hash(senha, 10);
        console.log('Senha criptografada:', hashedPassword);

        db.run(
          'INSERT INTO users (email, password) VALUES (?, ?)',
          [email, hashedPassword],
          function(err) {
            if (err) {
              if (err.message.includes('UNIQUE constraint failed')) {
                reject(new Error('Email já cadastrado'));
              } else {
                reject(new Error('Erro interno do servidor'));
              }
            } else {
              resolve({ id: this.lastID, email });
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (err, user) => {
          if (err) {
            reject(err);
          } else {
            resolve(user);
          }
        }
      );
    });
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
