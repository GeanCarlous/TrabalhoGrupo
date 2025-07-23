// /controllers/userController.js

/**
 * Lida com a rota GET /api/users/profile.
 * Retorna os dados do usuário que foram decodificados do token JWT
 * e anexados ao objeto 'req' pelo middleware de autenticação.
 */
const getProfile = (req, res) => {
  // O middleware 'authenticateToken' deve ter adicionado req.user.
  // Se não existir, algo está errado com o token ou o middleware.
  if (!req.user) {
    return res.status(404).json({ error: 'Informações do usuário não encontradas no token.' });
  }

  // Retorna os dados do usuário com sucesso.
  res.status(200).json({ user: req.user });
};

/**
 * Lida com a rota PUT /api/users/profile.
 * Esta é uma função de exemplo que pode ser expandida no futuro.
 */
const updateProfile = (req, res) => {
  // Aqui você poderia adicionar a lógica para atualizar
  // os dados do usuário no banco de dados.
  res.status(200).json({ message: 'Perfil atualizado com sucesso (funcionalidade a ser implementada).' });
};

// Exporta as duas funções para serem usadas nos arquivos de rotas.
// É crucial que a exportação seja feita desta forma.
module.exports = {
  getProfile,
  updateProfile,
};
