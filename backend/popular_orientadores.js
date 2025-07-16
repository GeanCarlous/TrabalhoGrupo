// Script para popular a tabela de orientadores com nomes reais
const db = require("./config/database");

const orientadores = [
  "Prof. Dr. Pablo Luiz Braga Soares",
  "Prof. Dr. Alexandre Matos Arruda",
  "Prof. Dr. Anderson Feitoza Leitão Maia",
  "Prof. Dr. Anderson M. Chaves Cunha",
  "Profa. Dra. Anna Beatriz dos Santos Marques",
  "Prof. Dr. Cenez Araújo de Rezende",
  "Prof. Dr. Antônio Neves da Silva",
  "Prof. Dr. Dmontier Pinheiro Aragão Jr.",
  "Prof. Dr. Eurinardo Rodrigues Costa",
  "Prof. Ms. Filipe Maciel Roberto",
  "Prof. Dr. Gastão Silves Ferreira Frederico",
  "Prof. Ms. Hugo Nathan Barbosa Regis",
  "Profa. Dra. Jacilane de Holanda Rabelo",
  "Prof. Dr. José Gleison Carneiro da Silva",
  "Prof. Ms. José Osvaldo Mesquita Chaves",
  "Profa. Dra. Josemeire Alves Gomes",
  "Prof. Dr. Marcos Vinicius de Andrade Lima",
  "Profa. Dra. Maria Nilde Fernandes Barreto Frederico",
  "Prof. Dr. Markos Oliveira Freitas",
  "Prof. Dr. Antonio Marcio Pereira Silva",   
  "Prof. Ms. José Robertty de Freitas Costa",
  "Prof. Dr. Mayrton Dias de Queiroz",
  "Profa. Dra. Patrícia Freitas Campos de Vasconcelos",
  "Prof. Ms. Pitágoras Graça Martins",
  "Prof. Dr. Rafael Fernandes Ivo",
  "Prof. Dr. Reuber Regis de Melo",
  "Profa. Dra. Rosineide Fernando da Paz",
  "Profa. Dra. Tatiane Fernandes Figueiredo",
  "Profa. Ms. Valeria Maria da Silva Pinheiro",
  "Prof. Vandeilson Cruz Nogueira",
];

orientadores.forEach((nome) => {
  db.run(
    "INSERT OR IGNORE INTO orientadores (nome) VALUES (?)",
    [nome],
    (err) => {
      if (err) {
        console.error("Erro ao inserir orientador:", nome, err.message);
      } else {
        console.log("Orientador inserido:", nome);
      }
    }
  );
});

db.close();
