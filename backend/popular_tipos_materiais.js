const db = require("./config/database");

const tipos = [
  "Artigo Científico",
  "Prova",
  "Dissertação",
  "Trabalho",
  "Tese",
  "Relatório",
  "Apresentação",
  "Atividade",
  "Outros"
];

tipos.forEach((nome) => {
  db.run(
    "INSERT OR IGNORE INTO tipos_material (nome) VALUES (?)",
    [nome],
    (err) => {
      if (err) {
        console.error("Erro ao inserir tipo de material:", nome, err.message);
      } else {
        console.log("Tipo de material inserido:", nome);
      }
    }
  );
});

db.close();