// Script para popular a tabela de relação disciplina_orientador
const db = require("./config/database");

const relacoes = [
  {
    disciplina: "Matemática Básica",
    orientadores: [
      "Prof. Dr. Anderson Feitoza Leitão Maia",
      "Prof. Dr. Anderson M. Chaves Cunha",
    ],
  },
  {
    disciplina: "Ética Profissional",
    orientadores: ["Profa. Dra. Josemeire Alves Gomes"],
  },
  {
    disciplina: "Fundamentos de Programação",
    orientadores: ["Prof. Dr. Markos Oliveira Freitas"],
  },
  {
    disciplina: "Introdução à Engenharia de Software",
    orientadores: [
      "Prof. Vandeilson Cruz Nogueira",
      "Profa. Dra. Patrícia Freitas Campos de Vasconcelos",
    ],
  },
  {
    disciplina: "Arquitetura de Computadores",
    orientadores: ["Prof. Dr. Reuber Regis de Melo"],
  },
  {
    disciplina: "Matemática Discreta",
    orientadores: [
      "Prof. Dr. José Gleison Carneiro da Silva",
      "Prof. Dr. Anderson Feitoza Leitão Maia",
    ],
  },
  {
    disciplina: "Introdução a Processos e Requisitos de Software",
    orientadores: [
      "Profa. Ms. Valeria Maria da Silva Pinheiro",
      "Prof. Ms. José Osvaldo Mesquita Chaves",
    ],
  },
  {
    disciplina: "Estruturas de Dados",
    orientadores: ["Profa. Dra. Tatiane Fernandes Figueiredo"],
  },
  {
    disciplina: "Laboratório de Programação",
    orientadores: [
      "Prof. Ms. Hugo Nathan Barbosa Regis",
      "Profa. Ms. Valeria Maria da Silva Pinheiro",
    ],
  },
  {
    disciplina: "Programação Orientada a Objetos",
    orientadores: ["Prof. Dr. Marcos Vinicius de Andrade Lima"],
  },
  {
    disciplina: "Probabilidade e Estatística",
    orientadores: [
      "Profa. Dra. Maria Nilde Fernandes Barreto Frederico",
      "Profa. Dra. Rosineide Fernando da Paz",
    ],
  },
  {
    disciplina: "Linguagens de Programação",
    orientadores: [
      "Prof. Dr. Rafael Fernandes Ivo",
      "Profa. Ms. Valeria Maria da Silva Pinheiro",
    ],
  },
  {
    disciplina: "Requisitos de Software",
    orientadores: ["Profa. Dra. Patrícia Freitas Campos de Vasconcelos"],
  },
  {
    disciplina: "Algoritmos em Grafos",
    orientadores: [
      "Prof. Dr. Pablo Luiz Braga Soares",
      "Prof. Dr. Eurinardo Rodrigues Costa",
    ],
  },
  {
    disciplina: "Análise e Projeto de Sistemas",
    orientadores: [
      "Prof. Dr. Marcos Vinicius de Andrade Lima",
      "Prof. Vandeilson Cruz Nogueira",
    ],
  },
  {
    disciplina: "Fundamentos de Banco de Dados",
    orientadores: [
      "Prof. Ms. José Robertty de Freitas Costa",
      "Prof. Ms. Pitágoras Graça Martins",
    ],
  },
  {
    disciplina: "Lógica para Computação",
    orientadores: [
      "Prof. Dr. Alexandre Matos Arruda",
      "Prof. Ms. José Robertty de Freitas Costa",
    ],
  },
  {
    disciplina: "Projeto e Análise de Algoritmos",
    orientadores: [
      "Prof. Dr. Eurinardo Rodrigues Costa",
      "Prof. Dr. Mayrton Dias de Queiroz",
    ],
  },
  {
    disciplina: "Processos de Software",
    orientadores: ["Profa. Dra. Patrícia Freitas Campos de Vasconcelos"],
  },
  {
    disciplina: "Sistemas Operacionais",
    orientadores: [
      "Prof. Ms. Hugo Nathan Barbosa Regis",
      "Prof. Dr. Reuber Regis de Melo",
    ],
  },
  {
    disciplina: "Projeto Detalhado de Software",
    orientadores: ["Profa. Dra. Jacilane de Holanda Rabelo"],
  },
  {
    disciplina: "Gerência de Projetos de Software",
    orientadores: [
      "Prof. Dr. Mayrton Dias de Queiroz",
      "Prof. Ms. José Osvaldo Mesquita Chaves",
    ],
  },
  {
    disciplina: "Redes de Computadores",
    orientadores: [
      "Prof. Ms. Pitágoras Graça Martins",
      "Profa. Ms. Valeria Maria da Silva Pinheiro",
    ],
  },
  {
    disciplina: "Interação Humano-Computador",
    orientadores: ["Profa. Dra. Patrícia Freitas Campos de Vasconcelos"],
  },
  {
    disciplina: "Computação Gráfica",
    orientadores: ["Prof. Dr. Rafael Fernandes Ivo"],
  },
  {
    disciplina: "Empreendedorismo",
    orientadores: [
      "Profa. Dra. Josemeire Alves Gomes",
      "Hevilla Souza Oliveira",
    ],
  },
  {
    disciplina: "Qualidade de Software",
    orientadores: ["Profa. Dra. Anna Beatriz dos Santos Marques"],
  },
  {
    disciplina: "Verificação e Validação",
    orientadores: ["Profa. Dra. Jacilane de Holanda Rabelo"],
  },
  {
    disciplina: "Manutenção de Software",
    orientadores: ["Profa. Dra. Jacilane de Holanda Rabelo"],
  },
  {
    disciplina: "Arquitetura de Software",
    orientadores: ["Profa. Dra. Anna Beatriz dos Santos Marques"],
  },
  {
    disciplina: "Pré-Cálculo",
    orientadores: [
      "Prof. Dr. Anderson M. Chaves Cunha",
      "Prof. Dr. Antônio Neves da Silva",
    ],
  },
  {
    disciplina: "Cálculo Diferencial e Integral I",
    orientadores: ["Prof. Dr. Antonio Marcio Pereira Silva"],
  },
  {
    disciplina: "Estruturas de Dados Avançadas",
    orientadores: ["Prof. Dr. Eurinardo Rodrigues Costa"],
  },
  {
    disciplina: "Linguagens Formais e Autômatos",
    orientadores: ["Prof. Dr. Cenez Araújo de Rezende"],
  },
  {
    disciplina: "Álgebra Linear",
    orientadores: [
      "Prof. Dr. Anderson Feitoza Leitão Maia",
      "Profa. Dra. Maria Nilde Fernandes Barreto Frederico",
      "Prof. Dr. José Gleison Carneiro da Silva",
    ],
  },
  {
    disciplina: "Compiladores",
    orientadores: ["Prof. Dr. Cenez Araújo de Rezende"],
  },
  {
    disciplina: "Matemática Computacional",
    orientadores: ["Profa. Dra. Tatiane Fernandes Figueiredo"],
  },
  {
    disciplina: "Desenvolvimento de Software para Web",
    orientadores: [
      "Prof. Vandeilson Cruz Nogueira",
      "Profa. Ms. Valeria Maria da Silva Pinheiro",
    ],
  },
  {
    disciplina: "Sistemas Distribuídos",
    orientadores: ["Prof. Ms. Pitágoras Graça Martins"],
  },
  {
    disciplina: "Inteligência Artificial",
    orientadores: ["Prof. Dr. Alexandre Matos Arruda"],
  },
  {
    disciplina: "Teoria da Computação",
    orientadores: ["Prof. Dr. Cenez Araújo de Rezende"],
  },
  { disciplina: "Segurança", orientadores: ["Prof. Dr. Reuber Regis de Melo"] },
  {
    disciplina: "Experimentação em Engenharia de Software",
    orientadores: ["Profa. Dra. Anna Beatriz dos Santos Marques"],
  },
  {
    disciplina: "Estimativa de Custos em Projetos de Software",
    orientadores: ["Prof. Dr. Anderson Feitoza Leitão Maia"],
  },
];

relacoes.forEach(({ disciplina, orientadores }) => {
  db.get(
    "SELECT id FROM disciplinas WHERE nome = ?",
    [disciplina],
    (err, discRow) => {
      if (discRow) {
        orientadores.forEach((orientadorNome) => {
          db.get(
            "SELECT id FROM orientadores WHERE nome LIKE ?",
            [`%${orientadorNome}%`],
            (err, oriRow) => {
              if (oriRow) {
                db.run(
                  "INSERT OR IGNORE INTO disciplina_orientador (disciplina_id, orientador_id) VALUES (?, ?)",
                  [discRow.id, oriRow.id],
                  (err) => {
                    if (err) {
                      console.error(
                        `Erro ao inserir relação: ${disciplina} - ${orientadorNome}`,
                        err.message
                      );
                    } else {
                      console.log(
                        `Relação inserida: ${disciplina} - ${orientadorNome}`
                      );
                    }
                  }
                );
              } else {
                console.warn(`Orientador não encontrado: ${orientadorNome}`);
              }
            }
          );
        });
      } else {
        console.warn(`Disciplina não encontrada: ${disciplina}`);
      }
    }
  );
});

setTimeout(() => db.close(), 5000);
