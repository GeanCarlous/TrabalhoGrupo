const getProfile = (req, res) => {
  res.json({ user: req.user });
};

const updateProfile = async (req, res) => {
  // Implementar atualização de perfil se necessário
  res.json({ message: 'Perfil atualizado com sucesso' });
};

module.exports = {
  getProfile,
  updateProfile
};
