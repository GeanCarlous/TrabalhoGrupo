const db = require('../config/database');

class Disciplina {
  static getAll(callback) {
    db.all('SELECT * FROM disciplinas', [], (err, rows) => {
      callback(err, rows);
    });
  }
}

module.exports = Disciplina;