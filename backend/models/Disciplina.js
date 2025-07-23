// /models/Disciplina.js

const db = require('../config/database');

class Disciplina {
  /**
   * Busca todas as disciplinas no banco de dados, ordenadas por nome.
   * @returns {Promise<Array>} Uma lista de todas as disciplinas.
   */
  static async getAll() {
    // A query busca todas as disciplinas e as ordena em ordem alfabética.
    const query = 'SELECT * FROM disciplinas ORDER BY nome ASC';
    
    // Executa a query e retorna a propriedade 'rows' do resultado.
    const { rows } = await db.query(query);
    return rows;
  }
}

module.exports = Disciplina;
