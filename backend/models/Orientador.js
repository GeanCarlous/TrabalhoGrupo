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
    // --- CORREÇÃO APLICADA AQUI ---
    // Trocamos o apelido 'do' por 'd_o' para evitar o conflito com a palavra reservada.
    const query = `
      SELECT o.* FROM orientadores AS o
      INNER JOIN disciplina_orientador AS d_o ON o.id = d_o.orientador_id
      WHERE d_o.disciplina_id = $1
      ORDER BY o.nome ASC
    `;
    const { rows } = await db.query(query, [disciplinaId]);
    return rows;
  }
}

module.exports = Orientador;
