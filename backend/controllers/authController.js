const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

const register = async (req, res) => {
  try {
    console.log('Requisição de registro recebida:', req.body);
    
    const { email, senha } = req.body;

    console.log('Dados do usuário:', { email, senha });
    
    const user = await User.create(email, senha);
    
    res.status(201).json({ 
      message: 'Usuário criado com sucesso', 
      id: user.id 
    });
  } catch (error) {
    if (error.message === 'Email já cadastrado') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const login = async (req, res) => {
  try {
    console.log('Requisição de login recebida:', req.body);
    const { email, password } = req.body;
    
    const user = await User.findByEmail(email);
    
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    const isValidPassword = await User.validatePassword(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    const token = generateToken({
      userId: user.id,
      email: user.email
    });
    
    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  register,
  login
};
