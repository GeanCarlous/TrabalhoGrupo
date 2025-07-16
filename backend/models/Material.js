const db = require('../config/database');

class Material {
  static create(data, callback) {
    const {
      titulo, dataObtencao, tipoMaterial, disciplina,
      orientador, descricao, filePath, fileOriginalName
    } = data;

    db.run(
      `INSERT INTO materials (titulo, dataObtencao, tipoMaterial, disciplina, orientador, descricao, filePath, fileOriginalName)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [titulo, dataObtencao, tipoMaterial, disciplina, orientador, descricao, filePath, fileOriginalName],
      function (err) {
        if (err) return callback(err);
        callback(null, { id: this.lastID, ...data });
      }
    );
  }

  static getAll(callback) {
    db.all('SELECT * FROM materials', [], (err, rows) => {
      callback(err, rows);
    });
  }
}

module.exports = Material;