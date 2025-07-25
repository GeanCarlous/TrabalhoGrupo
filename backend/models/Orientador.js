// /models/Orientador.js

const db = require('../config/database');

class Orientador {
  /**
   * Busca todos os orientadores no banco de dados, ordenados por nome.
   * @returns {Promise<Array>} Uma lista de todos os orientadores.
   */
  static async getAll() {
    const query = 'SELECT * FROM orientadores ORDER BY nome ASC';
    const { rows } = await db.query(query);
    return rows;
  }

  /**
   * Busca todos os orientadores associados a uma disciplina específica.
   * @param {number} disciplinaId - O ID da disciplina.
   * @returns {Promise<Array>} Uma lista de orientadores para a disciplina.
   */
  static async getByDisciplinaId(disciplinaId) {
    // Esta query junta as tabelas 'orientadores' e 'disciplina_orientador'
    // para encontrar os orientadores corretos com base no ID da disciplina.
    const query = `
      SELECT o.* FROM orientadores o
      INNER JOIN disciplina_orientador do ON o.id = do.orientador_id
      WHERE do.disciplina_id = $1
      ORDER BY o.nome ASC
    `;
    const { rows } = await db.query(query, [disciplinaId]);
    return rows;
  }
}

module.exports = Orientador;
