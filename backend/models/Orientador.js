const db = require('../config/database');

class Orientador {
  static getAll(callback) {
    db.all('SELECT * FROM orientadores', [], (err, rows) => {
      callback(err, rows);
    });
  }
}

module.exports = Orientador;