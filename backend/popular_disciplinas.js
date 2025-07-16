// Script para popular a tabela de disciplinas com nomes reais
const db = require("./config/database");

const disciplinas = [
  "Matemática Básica",
  "Ética Profissional",
  "Fundamentos de Programação",
  "Introdução à Engenharia de Software",
  "Arquitetura de Computadores",
  "Matemática Discreta",
  "Introdução a Processos e Requisitos de Software",
  "Estruturas de Dados",
  "Laboratório de Programação",
  "Programação Orientada a Objetos",
  "Probabilidade e Estatística",
  "Linguagens de Programação",
  "Requisitos de Software",
  "Algoritmos em Grafos",
  "Análise e Projeto de Sistemas",
  "Fundamentos de Banco de Dados",
  "Lógica para Computação",
  "Projeto e Análise de Algoritmos",
  "Processos de Software",
  "Sistemas Operacionais",
  "Projeto Detalhado de Software",
  "Gerência de Projetos de Software",
  "Redes de Computadores",
  "Interação Humano-Computador",
  "Computação Gráfica",
  "Empreendedorismo",
  "Qualidade de Software",
  "Verificação e Validação",
  "Manutenção de Software",
  "Arquitetura de Software",
  "Pré-Cálculo",
  "Cálculo Diferencial e Integral I",
  "Fundamentos da Economia e da Administração",
  "Estruturas de Dados Avançadas",
  "Linguagens Formais e Autômatos",
  "Álgebra Linear",
  "Compiladores",
  "Matemática Computacional",
  "Desenvolvimento de Software para Web",
  "Sistemas Distribuídos",
  "Inteligência Artificial",
  "Teoria da Computação",
  "Segurança",
  "Experimentação em Engenharia de Software",
  "Estimativa de Custos em Projetos de Software",
];

disciplinas.forEach((nome) => {
  db.run(
    "INSERT OR IGNORE INTO disciplinas (nome) VALUES (?)",
    [nome],
    (err) => {
      if (err) {
        console.error("Erro ao inserir disciplina:", nome, err.message);
      } else {
        console.log("Disciplina inserida:", nome);
      }
    }
  );
});

// Fechar conexão após inserir tudo
db.close();
