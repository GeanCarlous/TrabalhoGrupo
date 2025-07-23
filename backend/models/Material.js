// /models/Material.js

const db = require('../config/database');

class Material {
  // ... (o método create que já existe)
  static async create(data) {
    const {
      titulo, dataObtencao, tipoMaterial, disciplina,
      orientador, descricao, filePath, fileOriginalName
    } = data;
    const query = `
      INSERT INTO materials (titulo, dataObtencao, tipoMaterial, disciplina, orientador, descricao, filePath, fileOriginalName)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const values = [titulo, dataObtencao, tipoMaterial, disciplina, orientador, descricao, filePath, fileOriginalName];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  // ... (o método getAll que já existe)
  static async getAll() {
    const query = 'SELECT * FROM materials ORDER BY created_at DESC';
    const { rows } = await db.query(query);
    return rows;
  }

  /**
   * NOVO MÉTODO
   * Busca todos os materiais de uma disciplina específica.
   * @param {string} disciplinaNome - O nome da disciplina para filtrar.
   * @returns {Promise<Array>} Uma lista de materiais da disciplina especificada.
   */
  static async getByDisciplina(disciplinaNome) {
    const query = 'SELECT * FROM materials WHERE disciplina = $1 ORDER BY created_at DESC';
    const { rows } = await db.query(query, [disciplinaNome]);
    return rows;
  }
}

module.exports = Material;
