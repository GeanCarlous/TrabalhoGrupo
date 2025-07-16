const TipoMaterial = require("../models/TipoMaterial");

exports.getAll = (req, res) => {
  TipoMaterial.getAll((err, rows) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Erro ao buscar tipos de material." });
    res.json(rows);
  });
};
