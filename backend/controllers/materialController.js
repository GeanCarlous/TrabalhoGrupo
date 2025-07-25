// /controllers/materialController.js

const Material = require('../models/Material');
const db = require('../config/database');

/**
 * Função auxiliar para verificar se um valor existe em uma tabela.
 */
const checkIfExists = async (tableName, value) => {
  const query = `SELECT id FROM ${tableName} WHERE nome = $1`;
  const { rows } = await db.query(query, [value]);
  return rows.length > 0;
};

/**
 * Função auxiliar para verificar se um orientador está relacionado a uma disciplina.
 */
const checkRelationExists = async (disciplinaNome, orientadorNome) => {

  // Trocamos o apelido 'do' por 'd_o' para garantir que não haja conflito com palavras reservadas.
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


const uploadMaterial = async (req, res) => {
  try {
    // --- INÍCIO DAS VALIDAÇÕES ---

    // 1. Validação do arquivo
    if (!req.file) {
      return res.status(400).json({ error: 'O envio do arquivo é obrigatório.' });
    }

    const { titulo, dataObtencao, tipoMaterial, disciplina, orientador, descricao } = req.body;

    // 2. Validação dos campos obrigatórios
    const camposObrigatorios = { titulo, dataObtencao, tipoMaterial, disciplina, orientador };
    for (const campo in camposObrigatorios) {
      if (!camposObrigatorios[campo]) {
        return res.status(400).json({ error: `O campo '${campo}' é obrigatório.` });
      }
    }

    // 3. Validação da data (formato DD-MM-AAAA)
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

    // 4. Validação de existência dos dados
    if (!(await checkIfExists('disciplinas', disciplina))) {
      return res.status(400).json({ error: `A disciplina '${disciplina}' não é válida.` });
    }
    if (!(await checkIfExists('tipos_material', tipoMaterial))) {
      return res.status(400).json({ error: `O tipo de material '${tipoMaterial}' não é válido.` });
    }
    if (!(await checkIfExists('orientadores', orientador))) {
      return res.status(400).json({ error: `O orientador '${orientador}' não é válido.` });
    }

    // 5. Validação da relação entre orientador e disciplina
    if (!(await checkRelationExists(disciplina, orientador))) {
      return res.status(400).json({ error: `O orientador '${orientador}' não está relacionado à disciplina '${disciplina}'.` });
    }

    // --- FIM DAS VALIDAÇÕES ---

    const data = {
      titulo, dataObtencao, tipoMaterial, disciplina, orientador, descricao,
      filePath: req.file.path,
      fileOriginalName: req.file.originalname
    };

    const material = await Material.create(data);
    res.status(201).json(material);

  } catch (err) {
    console.error('Erro no uploadMaterial:', err);
    res.status(500).json({ error: 'Erro interno ao salvar o material.' });
  }
};


const getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.getAll();
    res.json(materials);
  } catch (err) {
    console.error('Erro no getAllMaterials:', err);
    res.status(500).json({ error: 'Erro interno ao buscar os materiais.' });
  }
};

const getMaterialsByDisciplina = async (req, res) => {
  try {
    const { disciplinaNome } = req.params;
    const materials = await Material.getByDisciplina(disciplinaNome);
    res.json(materials);
  } catch (err) {
    console.error(`Erro ao buscar materiais por disciplina:`, err);
    res.status(500).json({ error: 'Erro interno ao buscar os materiais.' });
  }
};

module.exports = {
  uploadMaterial,
  getAllMaterials,
  getMaterialsByDisciplina,
};
