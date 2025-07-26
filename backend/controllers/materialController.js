// /controllers/materialController.js

const Material = require('../models/Material');
const db = require('../config/database');

// Funções auxiliares permanecem inalteradas
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

const uploadMaterial = async (req, res) => {
  try {
    // --- INÍCIO DAS VALIDAÇÕES ---
    if (!req.file) {
      return res.status(400).json({ error: 'O envio do ficheiro é obrigatório.' });
    }

    const allowedMimeTypes = [
      'image/jpeg', 'image/png', 'application/pdf', 
      'application/zip', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: 'Tipo de arquivo não suportado. Use JPEG, PNG, PDF, ZIP ou DOCX.' });
    }

    const { titulo, dataObtencao, tipoMaterial, disciplina, orientador, descricao } = req.body;

    // Validação de campos obrigatórios
    const camposObrigatorios = { titulo, dataObtencao, tipoMaterial, disciplina, orientador };
    for (const campo in camposObrigatorios) {
      if (!camposObrigatorios[campo]) {
        return res.status(400).json({ error: `O campo '${campo}' é obrigatório.` });
      }
    }

    // Validação de data
    const partesData = dataObtencao.split('-');
    if (partesData.length !== 3 || partesData[0].length !== 2 || partesData[1].length !== 2 || partesData[2].length !== 4) {
      return res.status(400).json({ error: 'Formato de data inválido. Use DD-MM-AAAA.' });
    }
    const [dia, mes, ano] = partesData;
    const dataObtencaoDate = new Date(ano, mes - 1, dia);
    const dataAtual = new Date();
    dataObtencaoDate.setHours(0, 0, 0, 0);
    dataAtual.setHours(0, 0, 0, 0);
    if (isNaN(dataObtencaoDate.getTime())) {
      return res.status(400).json({ error: 'Data inválida. Verifique o formato.' });
    }
    if (dataObtencaoDate > dataAtual) {
      return res.status(400).json({ error: 'A data de obtenção não pode ser futura.' });
    }

    // Validação de existência no banco
    if (!(await checkIfExists('disciplinas', disciplina))) {
      return res.status(400).json({ error: `A disciplina '${disciplina}' não é válida.` });
    }
    if (!(await checkIfExists('tipos_material', tipoMaterial))) {
      return res.status(400).json({ error: `O tipo de material '${tipoMaterial}' não é válido.` });
    }
    if (!(await checkIfExists('orientadores', orientador))) {
      return res.status(400).json({ error: `O orientador '${orientador}' não é válido.` });
    }

    // Validação de relação
    if (!(await checkRelationExists(disciplina, orientador))) {
      return res.status(400).json({ error: `O orientador '${orientador}' não está relacionado à disciplina '${disciplina}'.` });
    }
    // --- FIM DAS VALIDAÇÕES ---

    // SOLUÇÃO ROBUSTA PARA URL DO ARQUIVO
    let fileUrl = '';
    
    // 1. Verificação de propriedades existentes
    if (req.file.secure_url) {
      fileUrl = req.file.secure_url;
    } else if (req.file.url) {
      fileUrl = req.file.url;
    } else if (req.file.path) {
      fileUrl = req.file.path;
    } else {
      // 2. Fallback para extrair do Cloudinary usando public_id
      const extension = req.file.originalname.split('.').pop();
      fileUrl = cloudinary.url(`${req.file.public_id}.${extension}`, {
        secure: true,
        resource_type: req.file.resource_type
      });
    }

    // 3. Adição de parâmetros para não-imagens
    if (!req.file.mimetype.startsWith('image/')) {
      // Verifica se já tem parâmetros de query
      const separator = fileUrl.includes('?') ? '&' : '?';
      fileUrl += `${separator}flags=attachment`;
    }

    const data = {
      titulo, 
      dataObtencao, 
      tipoMaterial, 
      disciplina, 
      orientador, 
      descricao,
      filePath: fileUrl,
      fileOriginalName: req.file.originalname,
      fileType: req.file.mimetype,
      user_id: req.user.id
    };

    const material = await Material.create(data);
    res.status(201).json(material);

  } catch (err) {
    // Tratamento de erros completo
    let errorMessage = 'Erro interno ao salvar o material.';
    let statusCode = 500;

    if (err.message.includes('Cloudinary') || err.message.includes('upload')) {
      errorMessage = 'Falha no serviço de armazenamento. Tente novamente.';
      statusCode = 502;
    } else if (err.message.includes('database') || err.message.includes('query')) {
      errorMessage = 'Erro de comunicação com o banco de dados.';
      statusCode = 503;
    }

    console.error('--- ERRO CRÍTICO ---');
    console.error('Mensagem:', err.message);
    console.error('Stack:', err.stack);
    console.error('Arquivo:', req.file);
    console.error('---------------------');
    
    res.status(statusCode).json({ error: errorMessage });
  }
};

// Resto das funções permanecem INALTERADAS
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
}

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

module.exports = {
  uploadMaterial,
  getAllMaterials,
  getMaterialsByDisciplina,
  getMaterialById,
  deleteMaterial,
  findMaterials
};