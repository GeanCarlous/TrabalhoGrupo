// /controllers/materialController.js

const Material = require('../models/Material');
const db = require('../config/database');

// --- Funções Auxiliares ---
const checkIfExists = async (tableName, value) => {
  const query = `SELECT id FROM ${tableName} WHERE nome = $1`;
  const { rows } = await db.query(query, [value]);
  return rows.length > 0;
};

const checkRelationExists = async (disciplinaNome, orientadorNome) => {
  const query = `
    SELECT 1
    FROM disciplina_orientador AS d_o 
    JOIN disciplinas AS d ON d.id = d_o.disciplina_id
    JOIN orientadores AS o ON o.id = d_o.orientador_id
    WHERE d.nome = $1 AND o.nome = $2
  `;
  const { rows } = await db.query(query, [disciplinaNome, orientadorNome]);
  return rows.length > 0;
};

// --- Funções do Controller ---

const uploadMaterial = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'O envio do ficheiro é obrigatório.' });
    }

    const { titulo, dataObtencao, tipoMaterial, disciplina, orientador, descricao } = req.body;

    const camposObrigatorios = { titulo, dataObtencao, tipoMaterial, disciplina, orientador };
    for (const campo in camposObrigatorios) {
      if (!camposObrigatorios[campo]) {
        return res.status(400).json({ error: `O campo '${campo}' é obrigatório.` });
      }
    }

    const partesData = dataObtencao.split('-');
    if (partesData.length !== 3 || partesData[0].length !== 2 || partesData[1].length !== 2 || partesData[2].length !== 4) {
      return res.status(400).json({ error: 'Formato de data inválido. Use DD-MM-AAAA.' });
    }
    const [dia, mes, ano] = partesData;
    const dataObtencaoDate = new Date(ano, mes - 1, dia);
    const dataAtual = new Date();
    dataObtencaoDate.setHours(0, 0, 0, 0);
    dataAtual.setHours(0, 0, 0, 0);
    if (isNaN(dataObtencaoDate.getTime()) || dataObtencaoDate.getDate() !== parseInt(dia)) {
      return res.status(400).json({ error: 'Data inválida. Verifique o dia e o mês.' });
    }
    if (dataObtencaoDate > dataAtual) {
      return res.status(400).json({ error: 'A data de obtenção não pode ser uma data futura.' });
    }

    if (!(await checkIfExists('disciplinas', disciplina))) {
      return res.status(400).json({ error: `A disciplina '${disciplina}' não é válida.` });
    }
    if (!(await checkIfExists('tipos_material', tipoMaterial))) {
      return res.status(400).json({ error: `O tipo de material '${tipoMaterial}' não é válido.` });
    }
    if (!(await checkIfExists('orientadores', orientador))) {
      return res.status(400).json({ error: `O orientador '${orientador}' não é válido.` });
    }

    if (!(await checkRelationExists(disciplina, orientador))) {
      return res.status(400).json({ error: `O orientador '${orientador}' não está relacionado à disciplina '${disciplina}'.` });
    }

    const data = {
      titulo, dataObtencao, tipoMaterial, disciplina, orientador, descricao,
      filePath: req.file.path,
      fileOriginalName: req.file.originalname,
      fileType: req.file.mimetype,
      user_id: req.user.id
    };

    const material = await Material.create(data);
    res.status(201).json(material);

  } catch (err) {
    console.error('--- ERRO DETALHADO NO UPLOAD ---');
    console.error(err);
    console.error('--- FIM DO ERRO ---');
    res.status(500).json({ error: 'Erro interno ao salvar o material.' });
  }
};

// Função para buscar todos os materiais (sem filtros)
const getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find({}); // Usa o método find sem filtros
    res.json(materials);
  } catch (err) {
    console.error('Erro no getAllMaterials:', err);
    res.status(500).json({ error: 'Erro interno ao buscar os materiais.' });
  }
};

// Função para buscar materiais por disciplina (usando o parâmetro da rota)
const getMaterialsByDisciplina = async (req, res) => {
  try {
    const { disciplinaNome } = req.params;
    const materials = await Material.find({ disciplina: disciplinaNome });
    res.json(materials);
  } catch (err) {
    console.error(`Erro ao buscar materiais por disciplina:`, err);
    res.status(500).json({ error: 'Erro interno ao buscar os materiais.' });
  }
};

// Função unificada para busca e filtro (usando query string)
const findMaterials = async (req, res) => {
  try {
    const { search, disciplina } = req.query;
    const filters = {};
    if (search) filters.search = search;
    if (disciplina) filters.disciplina = disciplina;
    const materials = await Material.find(filters);
    res.json(materials);
  } catch (err) {
    console.error('Erro ao buscar materiais:', err);
    res.status(500).json({ error: 'Erro interno ao buscar os materiais.' });
  }
};

const getMaterialById = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await Material.getById(id);
    if (!material) {
      return res.status(404).json({ error: 'Material não encontrado.' });
    }
    res.json(material);
  } catch (err) {
    console.error(`Erro ao buscar material por ID:`, err);
    res.status(500).json({ error: 'Erro interno ao buscar o material.' });
  }
};

const deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const deletedRows = await Material.deleteById(id, userId);
    if (deletedRows === 0) {
      return res.status(403).json({ error: 'Você não tem permissão para apagar este material.' });
    }
    res.status(200).json({ message: 'Material apagado com sucesso.' });
  } catch (err) {
    console.error(`Erro ao apagar material:`, err);
    res.status(500).json({ error: 'Erro interno ao apagar o material.' });
  }
};

// Exporta todas as funções que o seu ficheiro de rotas precisa
module.exports = {
  uploadMaterial,
  getAllMaterials,
  getMaterialsByDisciplina,
  getMaterialById,
  deleteMaterial,
  findMaterials,
};
