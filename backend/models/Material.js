// /models/Material.js

const db = require('../config/database');

class Material {
  /**
   * Cria um novo material no banco de dados.
   * @param {object} data - Os dados do material, incluindo user_id e fileType.
   * @returns {Promise<object>} O material criado.
   */
  static async create(data) {
    const {
      titulo, dataObtencao, tipoMaterial, disciplina,
      orientador, descricao, filePath, fileOriginalName, fileType, user_id
    } = data;
    const query = `
      INSERT INTO materials (
        titulo, dataObtencao, tipoMaterial, disciplina, orientador, 
        descricao, filePath, fileOriginalName, fileType, user_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;
    const values = [
      titulo, dataObtencao, tipoMaterial, disciplina, orientador, 
      descricao, filePath, fileOriginalName, fileType, user_id
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  /**
   * Busca materiais com base em filtros de pesquisa (título OU orientador) e/ou disciplina.
   * @param {object} filters - Objeto com os filtros (ex: { search: 'prova', disciplina: 'Cálculo' }).
   * @returns {Promise<Array>} Uma lista de materiais filtrados.
   */
  static async find(filters = {}) {
    let baseQuery = `
      SELECT m.*, u.nome AS user_nome 
      FROM materials AS m
      LEFT JOIN users AS u ON m.user_id = u.id
    `;
    
    const conditions = [];
    const values = [];
    let paramIndex = 1;

    if (filters.disciplina) {
      conditions.push(`m.disciplina = $${paramIndex++}`);
      values.push(filters.disciplina);
    }

    if (filters.search) {
      // A pesquisa verifica se o termo aparece no título OU no nome do orientador
      conditions.push(`(m.titulo ILIKE $${paramIndex} OR m.orientador ILIKE $${paramIndex})`);
      values.push(`%${filters.search}%`);
      paramIndex++;
    }

    if (conditions.length > 0) {
      baseQuery += ' WHERE ' + conditions.join(' AND ');
    }

    baseQuery += ' ORDER BY m.created_at DESC';

    const { rows } = await db.query(baseQuery, values);
    return rows;
  }

  /**
   * Busca um material específico pelo seu ID, juntamente com o nome do utilizador que o enviou.
   * @param {number} id - O ID do material.
   * @returns {Promise<object|undefined>} O objeto do material se encontrado, senão undefined.
   */
  static async getById(id) {
    const query = `
      SELECT m.*, u.nome AS user_nome 
      FROM materials AS m
      LEFT JOIN users AS u ON m.user_id = u.id
      WHERE m.id = $1
    `;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }

  /**
   * Apaga um material pelo seu ID, mas apenas se o user_id corresponder.
   * @param {number} materialId - O ID do material a ser apagado.
   * @param {number} userId - O ID do utilizador que está a tentar apagar.
   * @returns {Promise<number>} O número de linhas apagadas (0 ou 1).
   */
  static async deleteById(materialId, userId) {
    const query = `
      DELETE FROM materials
      WHERE id = $1 AND user_id = $2
    `;
    const result = await db.query(query, [materialId, userId]);
    return result.rowCount;
  }
}

module.exports = Material;
