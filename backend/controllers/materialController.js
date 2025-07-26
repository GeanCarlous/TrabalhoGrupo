// /controllers/materialController.js

const Material = require('../models/Material');
const db = require('../config/database');

/**
 * Função auxiliar para verificar se um valor existe numa tabela.
 * @param {string} tableName - O nome da tabela (ex: 'disciplinas').
 * @param {string} value - O valor a ser verificado na coluna 'nome'.
 * @returns {Promise<boolean>} Retorna true se o valor existir, false caso contrário.
 */
const checkIfExists = async (tableName, value) => {
  const query = `SELECT id FROM ${tableName} WHERE nome = $1`;
  const { rows } = await db.query(query, [value]);
  return rows.length > 0;
};

/**
 * Função auxiliar para verificar se um orientador está relacionado a uma disciplina.
 * @param {string} disciplinaNome - O nome da disciplina.
 * @param {string} orientadorNome - O nome do orientador.
 * @returns {Promise<boolean>} Retorna true se a relação existir, false caso contrário.
 */
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

    // 1. Validação do ficheiro
    if (!req.file) {
      return res.status(400).json({ error: 'O envio do ficheiro é obrigatório.' });
    }

    // Validação de tipos de arquivo permitidos [CORREÇÃO ADICIONADA]
    const allowedMimeTypes = [
      'image/jpeg', 
      'image/png', 
      'application/pdf', 
      'application/zip',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: 'Tipo de arquivo não suportado. Use JPEG, PNG, PDF, ZIP ou DOCX.' });
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

    // CORREÇÃO CRÍTICA: Tratamento da URL do Cloudinary [ÁREA MODIFICADA]
    let fileUrl = req.file.secure_url; // SEMPRE use secure_url
    
    // Adiciona parâmetro para forçar download se não for imagem
    if (!req.file.mimetype.startsWith('image/')) {
      fileUrl += '?flags=attachment'; // Força download no Cloudinary
    }

    const data = {
      titulo, 
      dataObtencao, 
      tipoMaterial, 
      disciplina, 
      orientador, 
      descricao,
      filePath: fileUrl, // URL correta com tratamento
      fileOriginalName: req.file.originalname,
      fileType: req.file.mimetype, // Novo campo salvo [ADICIONADO]
      user_id: req.user.id
    };

    const material = await Material.create(data);
    res.status(201).json(material);

  } catch (err) {
    // Tratamento melhorado de erros do Cloudinary [CORREÇÃO ADICIONADA]
    if (err.message.includes('Cloudinary API') || err.message.includes('upload error')) {
      console.error('ERRO DO CLOUDINARY:', err);
      return res.status(502).json({ error: 'Falha no upload do arquivo. Tente novamente.' });
    }
    
    console.error('--- ERRO DETALHADO NO UPLOAD ---');
    console.error(err);
    console.error('--- FIM DO ERRO ---');
    
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

/**
 * NOVA FUNÇÃO UNIFICADA
 * Busca materiais com base em filtros de query string (search, disciplina).
 * Substitui as antigas getAllMaterials e getMaterialsByDisciplina.
 */
const findMaterials = async (req, res) => {
  try {
    // Pega os parâmetros da URL, ex: /api/materials?search=prova&disciplina=Cálculo
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