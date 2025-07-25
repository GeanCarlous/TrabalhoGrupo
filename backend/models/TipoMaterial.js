// /models/TipoMaterial.js

const db = require('../config/database');

class TipoMaterial {
  /**
   * Busca todos os tipos de material no banco de dados, ordenados por nome.
   * @returns {Promise<Array>} Uma lista de todos os tipos de material.
   */
  static async getAll() {
    // A query busca todos os tipos e os ordena em ordem alfabética.
    const query = 'SELECT * FROM tipos_material ORDER BY nome ASC';
    
    // Executa a query e retorna a propriedade 'rows' do resultado.
    const { rows } = await db.query(query);
    return rows;
  }
}

module.exports = TipoMaterial;
