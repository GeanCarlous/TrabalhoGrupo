const Material = require('../models/Material');

exports.uploadMaterial = (req, res) => {
  const { titulo, dataObtencao, tipoMaterial, disciplina, orientador, descricao } = req.body;
  if (!req.file) return res.status(400).json({ error: 'Arquivo é obrigatório.' });

  const data = {
    titulo,
    dataObtencao,
    tipoMaterial,
    disciplina,
    orientador,
    descricao,
    filePath: req.file.path,
    fileOriginalName: req.file.originalname
  };

  Material.create(data, (err, material) => {
    if (err) return res.status(500).json({ error: 'Erro ao salvar material.' });
    res.status(201).json(material);
  });
};

exports.getAllMaterials = (req, res) => {
  Material.getAll((err, materials) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar materiais.' });
    res.json(materials);
  });
};