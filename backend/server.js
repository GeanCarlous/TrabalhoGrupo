const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar configuração do banco (isso irá inicializar o banco)
require('./config/database');

// Importar rotas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Rota para compatibilidade com o frontend atual
app.use('/api', authRoutes); // Para manter /api/register e /api/login

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ message: 'Servidor funcionando!', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
