const db = require('../config/database');

class TipoMaterial {
  static getAll(callback) {
    db.all('SELECT * FROM tipos_material', [], (err, rows) => {
      callback(err, rows);
    });
  }
}

module.exports = TipoMaterial;