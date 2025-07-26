// /models/Material.js

const db = require('../config/database');

class Material {
  /**
   * Cria um novo material no banco de dados.
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
   * MÉTODO DE PESQUISA CORRIGIDO E SIMPLIFICADO
   * Busca materiais com base em filtros de pesquisa (título OU orientador) e/ou disciplina.
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

    // Adiciona condição de filtro por disciplina, se existir
    if (filters.disciplina) {
      conditions.push(`m.disciplina = $${paramIndex++}`);
      values.push(filters.disciplina);
    }

    // Adiciona condição de pesquisa por título OU orientador, se existir
    if (filters.search) {
      // ILIKE faz uma pesquisa case-insensitive no PostgreSQL
      conditions.push(`(m.titulo ILIKE $${paramIndex} OR m.orientador ILIKE $${paramIndex})`);
      values.push(`%${filters.search}%`);
      paramIndex++;
    }

    if (conditions.length > 0) {
      baseQuery += ' WHERE ' + conditions.join(' AND ');
    }

    baseQuery += ' ORDER BY m.created_at DESC';

    // Log de diagnóstico para a consulta final
    console.log('[MODEL] Executando a consulta:', baseQuery);
    console.log('[MODEL] Com os valores:', values);

    const { rows } = await db.query(baseQuery, values);
    return rows;
  }

  /**
   * Busca um material específico pelo seu ID.
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
   * Apaga um material pelo seu ID, verificando a permissão do utilizador.
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
