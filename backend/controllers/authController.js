// /controllers/authController.js

const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }
    if (!email.toLowerCase().endsWith('@alu.ufc.br')) {
      return res.status(400).json({ error: 'O email deve ser do domínio @alu.ufc.br' });
    }
    const user = await User.create(email, password);
    res.status(201).json({ message: 'Usuário criado com sucesso!', user });
  } catch (error) {
    if (error.message === 'Este email já está cadastrado.') {
      return res.status(409).json({ error: error.message });
    }
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const isValidPassword = await User.validatePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = generateToken({ id: user.id, email: user.email });

    delete user.password;

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user,
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  register,
  login,
};
