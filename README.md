# 📚 Banco de Materiais de Estudo Colaborativo - UFC Russas

![Status do Projeto](https://img.shields.io/badge/status-concluído-brightgreen)
![Linguagem](https://img.shields.io/badge/linguagem-JavaScript-yellow)
![Framework](https://img.shields.io/badge/framework-React%20%7C%20Node.js-blue)

## 📖 Sobre o Projeto

Este projeto é um **Banco de Materiais de Estudo Colaborativo**, desenvolvido como trabalho final para a disciplina de Desenvolvimento de Software para Web da **Universidade Federal do Ceará (UFC) - Campus Russas**.

O objetivo principal é criar uma plataforma centralizada e organizada onde os alunos possam partilhar e encontrar materiais de estudo, como provas, trabalhos e resumos, de diversas disciplinas e professores do campus. A aplicação foi concebida seguindo a metodologia **Design Thinking** para garantir que a solução atenda às necessidades reais dos estudantes.

---

## ✨ Funcionalidades Principais

* **🔐 Autenticação Segura:** Sistema de registo e login exclusivo para alunos com email institucional (`@alu.ufc.br`), com senhas criptografadas e tokens JWT para segurança das sessões.

* **👤 Gestão de Perfil:** Os utilizadores podem atualizar o seu nome e selecionar o seu curso após o registo.

* **📤 Upload de Materiais:** Formulário completo para envio de materiais, com suporte para `drag and drop`, validação de campos e de tamanho de ficheiro (até 10MB).

* **☁️ Armazenamento na Nuvem:** Os ficheiros são enviados de forma segura para o **Cloudinary**, garantindo escalabilidade e disponibilidade.

* **🔍 Pesquisa e Filtragem Avançada:**
    * Pesquisa por **título do material** 
    * Filtro por **disciplina**.

* **📄 Visualização Detalhada:** Página dedicada para cada material, com pré-visualização de imagens, informações detalhadas e botão para visualizar ou baixar o ficheiro.

* **🗑️ Gestão de Conteúdo:** Um utilizador só pode apagar os materiais que ele próprio enviou.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com uma arquitetura moderna, separando o frontend do backend.

### **Frontend**

* [**React.js**](https://reactjs.org/): Biblioteca principal para a construção da interface de utilizador.
* [**React Router**](https://reactrouter.com/): Para a gestão de rotas na aplicação.
* **CSS Puro**: Para estilização modular e específica de cada componente.

### **Backend**

* [**Node.js**](https://nodejs.org/): Ambiente de execução do servidor.
* [**Express.js**](https://expressjs.com/): Framework para a construção da API REST.
* [**PostgreSQL**](https://www.postgresql.org/): Banco de dados relacional para armazenar os dados.
* [**pg**](https://node-postgres.com/): Driver para a conexão entre o Node.js e o PostgreSQL.
* [**JSON Web Token (JWT)**](https://jwt.io/): Para a autenticação e autorização.
* [**Multer**](https://github.com/expressjs/multer) e [**Cloudinary**](https://cloudinary.com/): Para o processamento e armazenamento de uploads de ficheiros.

### **Infraestrutura e Deploy**

* **Banco de Dados:** Hospedado no [**Neon**](https://neon.tech/).
* **Backend:** Publicado no [**Render**](https://render.com/).
* **Frontend:** Publicado na [**Vercel**](https://vercel.com/)

---

## ⚙️ Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e executar o projeto na sua máquina.

### **Pré-requisitos**

* [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
* [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
* Uma instância de PostgreSQL (pode ser local ou um serviço como o [Neon](https://neon.tech/))
* Uma conta no [Cloudinary](https://cloudinary.com/)

### **1. Clonar o Repositório**

```bash
git clone [https://github.com/GeanCarlous/TrabalhoGrupo.git](https://github.com/GeanCarlous/TrabalhoGrupo.git)
cd TrabalhoGrupo
```

### **2. Configurar o Backend**

```bash
# Navegue para a pasta do backend
cd backend

# Instale as dependências
npm install

# Crie um ficheiro .env na raiz da pasta /backend e adicione as seguintes variáveis:
DATABASE_URL="sua_url_de_conexao_do_postgresql"
JWT_SECRET="uma_chave_secreta_longa_e_segura"
CLOUDINARY_CLOUD_NAME="seu_cloud_name"
CLOUDINARY_API_KEY="sua_api_key"
CLOUDINARY_API_SECRET="seu_api_secret"

# Crie as tabelas no seu banco de dados
node config/setup.js

# Povoe o banco com os dados iniciais (disciplinas, cursos, etc.)
node config/seed.js

# Inicie o servidor backend
npm start
```

O servidor estará a rodar em `http://localhost:5000`.

### **3. Configurar o Frontend**

```bash
# A partir da raiz do projeto, navegue para a pasta do frontend
cd ../frontend

# Instale as dependências
npm install

# Crie um ficheiro .env na raiz da pasta /frontend e adicione a seguinte variável:
REACT_APP_API_URL=http://localhost:5000/api

# Inicie a aplicação React
npm start
```

A aplicação abrirá no seu navegador em `http://localhost:3000`.

---

## 👥 Autores

Este projeto foi desenvolvido com dedicação por:

* **[Gean Carlos](https://github.com/GeanCarlous)** - `Desenvolvedor Frontend`
* **[Marllon Vinícius](https://github.com/MarllonVinicius0?tab=repositories)** - `Desenvolvedor Full Stack`
* **[Maria Isabele](https://github.com/IsabeleOliveira)** - `UI/UX`
* **[Lucas Dantas](https://github.com/URL_DO_GITHUB_AQUI)** - `Analista de Requisitos`
* **[Fabio Henrique](https://github.com/URL_DO_GITHUB_AQUI)** - `UI/UX`
* **[Francisca Hernestiana](https://github.com/hernestiana)** - `Desenvolvedora BackEnd`
* **[Heloisa Even](https://github.com/heloisaeven)** - `Analista de Requisitos`
---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o ficheiro [LICENSE](LICENSE) para mais detalhes.
