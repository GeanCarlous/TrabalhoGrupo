// /config/seed.js

const db = require('./database');

// --- DADOS PARA POVOAR O BANCO ---

const cursos = [
  "Engenharia de Software", 
  "Ciência da Computação", 
  "Engenharia de Produção", 
  "Engenharia Civil", 
  "Engenharia Mecânica"
];

const disciplinas = [
  "Matemática Básica", "Ética Profissional", "Fundamentos de Programação", "Introdução à Engenharia de Software", "Arquitetura de Computadores", "Matemática Discreta", "Introdução a Processos e Requisitos de Software", "Estruturas de Dados", "Laboratório de Programação", "Programação Orientada a Objetos", "Probabilidade e Estatística", "Linguagens de Programação", "Requisitos de Software", "Algoritmos em Grafos", "Análise e Projeto de Sistemas", "Fundamentos de Banco de Dados", "Lógica para Computação", "Projeto e Análise de Algoritmos", "Processos de Software", "Sistemas Operacionais", "Projeto Detalhado de Software", "Gerência de Projetos de Software", "Redes de Computadores", "Interação Humano-Computador", "Computação Gráfica", "Empreendedorismo", "Qualidade de Software", "Verificação e Validação", "Manutenção de Software", "Arquitetura de Software", "Pré-Cálculo", "Cálculo Diferencial e Integral I", "Fundamentos da Economia e da Administração", "Estruturas de Dados Avançadas", "Linguagens Formais e Autômatos", "Álgebra Linear", "Compiladores", "Matemática Computacional", "Desenvolvimento de Software para Web", "Sistemas Distribuídos", "Inteligência Artificial", "Teoria da Computação", "Segurança", "Experimentação em Engenharia de Software", "Estimativa de Custos em Projetos de Software",
];

const tipos_material = [
  "Artigo Científico", "Prova", "Dissertação", "Trabalho", "Tese", "Relatório", "Apresentação", "Atividade", "Outros"
];

const orientadores = [
  "Prof. Dr. Pablo Luiz Braga Soares", "Prof. Dr. Alexandre Matos Arruda", "Prof. Dr. Anderson Feitoza Leitão Maia", "Prof. Dr. Anderson M. Chaves Cunha", "Profa. Dra. Anna Beatriz dos Santos Marques", "Prof. Dr. Cenez Araújo de Rezende", "Prof. Dr. Antônio Neves da Silva", "Prof. Dr. Dmontier Pinheiro Aragão Jr.", "Prof. Dr. Eurinardo Rodrigues Costa", "Prof. Ms. Filipe Maciel Roberto", "Prof. Dr. Gastão Silves Ferreira Frederico", "Prof. Ms. Hugo Nathan Barbosa Regis", "Profa. Dra. Jacilane de Holanda Rabelo", "Prof. Dr. José Gleison Carneiro da Silva", "Prof. Ms. José Osvaldo Mesquita Chaves", "Profa. Dra. Josemeire Alves Gomes", "Prof. Dr. Marcos Vinicius de Andrade Lima", "Profa. Dra. Maria Nilde Fernandes Barreto Frederico", "Prof. Dr. Markos Oliveira Freitas", "Prof. Dr. Antonio Marcio Pereira Silva", "Prof. Ms. José Robertty de Freitas Costa", "Prof. Dr. Mayrton Dias de Queiroz", "Profa. Dra. Patrícia Freitas Campos de Vasconcelos", "Prof. Ms. Pitágoras Graça Martins", "Prof. Dr. Rafael Fernandes Ivo", "Prof. Dr. Reuber Regis de Melo", "Profa. Dra. Rosineide Fernando da Paz", "Profa. Dra. Tatiane Fernandes Figueiredo", "Profa. Ms. Valeria Maria da Silva Pinheiro", "Prof. Vandeilson Cruz Nogueira", "Hevilla Souza Oliveira",
];

const relacoes = [
  { disciplina: "Matemática Básica", orientadores: ["Prof. Dr. Anderson Feitoza Leitão Maia", "Prof. Dr. Anderson M. Chaves Cunha"] },
  { disciplina: "Ética Profissional", orientadores: ["Profa. Dra. Josemeire Alves Gomes"] },
  { disciplina: "Fundamentos de Programação", orientadores: ["Prof. Dr. Markos Oliveira Freitas"] },
  { disciplina: "Introdução à Engenharia de Software", orientadores: ["Prof. Vandeilson Cruz Nogueira", "Profa. Dra. Patrícia Freitas Campos de Vasconcelos"] },
  { disciplina: "Arquitetura de Computadores", orientadores: ["Prof. Dr. Reuber Regis de Melo"] },
  { disciplina: "Matemática Discreta", orientadores: ["Prof. Dr. José Gleison Carneiro da Silva", "Prof. Dr. Anderson Feitoza Leitão Maia"] },
  { disciplina: "Introdução a Processos e Requisitos de Software", orientadores: ["Profa. Ms. Valeria Maria da Silva Pinheiro", "Prof. Ms. José Osvaldo Mesquita Chaves"] },
  { disciplina: "Estruturas de Dados", orientadores: ["Profa. Dra. Tatiane Fernandes Figueiredo"] },
  { disciplina: "Laboratório de Programação", orientadores: ["Prof. Ms. Hugo Nathan Barbosa Regis", "Profa. Ms. Valeria Maria da Silva Pinheiro"] },
  { disciplina: "Programação Orientada a Objetos", orientadores: ["Prof. Dr. Marcos Vinicius de Andrade Lima"] },
  { disciplina: "Probabilidade e Estatística", orientadores: ["Profa. Dra. Maria Nilde Fernandes Barreto Frederico", "Profa. Dra. Rosineide Fernando da Paz"] },
  { disciplina: "Linguagens de Programação", orientadores: ["Prof. Dr. Rafael Fernandes Ivo", "Profa. Ms. Valeria Maria da Silva Pinheiro"] },
  { disciplina: "Requisitos de Software", orientadores: ["Profa. Dra. Patrícia Freitas Campos de Vasconcelos"] },
  { disciplina: "Algoritmos em Grafos", orientadores: ["Prof. Dr. Pablo Luiz Braga Soares", "Prof. Dr. Eurinardo Rodrigues Costa"] },
  { disciplina: "Análise e Projeto de Sistemas", orientadores: ["Prof. Dr. Marcos Vinicius de Andrade Lima", "Prof. Vandeilson Cruz Nogueira"] },
  { disciplina: "Fundamentos de Banco de Dados", orientadores: ["Prof. Ms. José Robertty de Freitas Costa", "Prof. Ms. Pitágoras Graça Martins"] },
  { disciplina: "Lógica para Computação", orientadores: ["Prof. Dr. Alexandre Matos Arruda", "Prof. Ms. José Robertty de Freitas Costa"] },
  { disciplina: "Projeto e Análise de Algoritmos", orientadores: ["Prof. Dr. Eurinardo Rodrigues Costa", "Prof. Dr. Mayrton Dias de Queiroz"] },
  { disciplina: "Processos de Software", orientadores: ["Profa. Dra. Patrícia Freitas Campos de Vasconcelos"] },
  { disciplina: "Sistemas Operacionais", orientadores: ["Prof. Ms. Hugo Nathan Barbosa Regis", "Prof. Dr. Reuber Regis de Melo"] },
  { disciplina: "Projeto Detalhado de Software", orientadores: ["Profa. Dra. Jacilane de Holanda Rabelo"] },
  { disciplina: "Gerência de Projetos de Software", orientadores: ["Prof. Dr. Mayrton Dias de Queiroz", "Prof. Ms. José Osvaldo Mesquita Chaves"] },
  { disciplina: "Redes de Computadores", orientadores: ["Prof. Ms. Pitágoras Graça Martins", "Profa. Ms. Valeria Maria da Silva Pinheiro"] },
  { disciplina: "Interação Humano-Computador", orientadores: ["Profa. Dra. Patrícia Freitas Campos de Vasconcelos"] },
  { disciplina: "Computação Gráfica", orientadores: ["Prof. Dr. Rafael Fernandes Ivo"] },
  { disciplina: "Empreendedorismo", orientadores: ["Profa. Dra. Josemeire Alves Gomes", "Hevilla Souza Oliveira"] },
  { disciplina: "Qualidade de Software", orientadores: ["Profa. Dra. Anna Beatriz dos Santos Marques"] },
  { disciplina: "Verificação e Validação", orientadores: ["Profa. Dra. Jacilane de Holanda Rabelo"] },
  { disciplina: "Manutenção de Software", orientadores: ["Profa. Dra. Jacilane de Holanda Rabelo"] },
  { disciplina: "Arquitetura de Software", orientadores: ["Profa. Dra. Anna Beatriz dos Santos Marques"] },
  { disciplina: "Pré-Cálculo", orientadores: ["Prof. Dr. Anderson M. Chaves Cunha", "Prof. Dr. Antônio Neves da Silva"] },
  { disciplina: "Cálculo Diferencial e Integral I", orientadores: ["Prof. Dr. Antonio Marcio Pereira Silva"] },
  { disciplina: "Estruturas de Dados Avançadas", orientadores: ["Prof. Dr. Eurinardo Rodrigues Costa"] },
  { disciplina: "Linguagens Formais e Autômatos", orientadores: ["Prof. Dr. Cenez Araújo de Rezende"] },
  { disciplina: "Álgebra Linear", orientadores: ["Prof. Dr. Anderson Feitoza Leitão Maia", "Profa. Dra. Maria Nilde Fernandes Barreto Frederico", "Prof. Dr. José Gleison Carneiro da Silva"] },
  { disciplina: "Compiladores", orientadores: ["Prof. Dr. Cenez Araújo de Rezende"] },
  { disciplina: "Matemática Computacional", orientadores: ["Profa. Dra. Tatiane Fernandes Figueiredo"] },
  { disciplina: "Desenvolvimento de Software para Web", orientadores: ["Prof. Vandeilson Cruz Nogueira", "Profa. Ms. Valeria Maria da Silva Pinheiro"] },
  { disciplina: "Sistemas Distribuídos", orientadores: ["Prof. Ms. Pitágoras Graça Martins"] },
  { disciplina: "Inteligência Artificial", orientadores: ["Prof. Dr. Alexandre Matos Arruda"] },
  { disciplina: "Teoria da Computação", orientadores: ["Prof. Dr. Cenez Araújo de Rezende"] },
  { disciplina: "Segurança", orientadores: ["Prof. Dr. Reuber Regis de Melo"] },
  { disciplina: "Experimentação em Engenharia de Software", orientadores: ["Profa. Dra. Anna Beatriz dos Santos Marques"] },
  { disciplina: "Estimativa de Custos em Projetos de Software", orientadores: ["Prof. Dr. Anderson Feitoza Leitão Maia"] },
];

async function seedDatabase() {
  console.log('Iniciando o povoamento do banco de dados...');
  try {
    // ETAPA CORRIGIDA: Inserir Cursos
    console.log('Inserindo cursos...');
    for (const nome of cursos) {
      await db.query('INSERT INTO cursos (nome) VALUES ($1) ON CONFLICT (nome) DO NOTHING', [nome]);
    }
    console.log('Cursos inseridos com sucesso!');

    // Inserir Disciplinas
    console.log('Inserindo disciplinas...');
    for (const nome of disciplinas) {
      await db.query('INSERT INTO disciplinas (nome) VALUES ($1) ON CONFLICT (nome) DO NOTHING', [nome]);
    }
    console.log('Disciplinas inseridas com sucesso!');

    // Inserir Tipos de Material
    console.log('Inserindo tipos de material...');
    for (const nome of tipos_material) {
      await db.query('INSERT INTO tipos_material (nome) VALUES ($1) ON CONFLICT (nome) DO NOTHING', [nome]);
    }
    console.log('Tipos de material inseridos com sucesso!');

    // Inserir Orientadores
    console.log('Inserindo orientadores...');
    for (const nome of orientadores) {
      await db.query('INSERT INTO orientadores (nome) VALUES ($1) ON CONFLICT (nome) DO NOTHING', [nome]);
    }
    console.log('Orientadores inseridos com sucesso!');

    // Inserir Relações
    console.log('Inserindo relações entre disciplinas e orientadores...');
    for (const relacao of relacoes) {
      const disciplinaResult = await db.query('SELECT id FROM disciplinas WHERE nome = $1', [relacao.disciplina]);
      if (disciplinaResult.rows.length === 0) {
        console.warn(`AVISO: Disciplina "${relacao.disciplina}" não encontrada. Pulando relação.`);
        continue;
      }
      const disciplinaId = disciplinaResult.rows[0].id;
      for (const orientadorNome of relacao.orientadores) {
        const orientadorResult = await db.query('SELECT id FROM orientadores WHERE nome = $1', [orientadorNome]);
        if (orientadorResult.rows.length === 0) {
          console.warn(`AVISO: Orientador "${orientadorNome}" não encontrado. Pulando relação.`);
          continue;
        }
        const orientadorId = orientadorResult.rows[0].id;
        await db.query(
          'INSERT INTO disciplina_orientador (disciplina_id, orientador_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
          [disciplinaId, orientadorId]
        );
      }
    }
    console.log('Relações inseridas com sucesso!');

  } catch (err) {
    console.error('ERRO FATAL DURANTE O POVOAMENTO:', err);
  } finally {
    console.log('Povoamento do banco de dados concluído.');
  }
}

// Executa a função principal
seedDatabase();
