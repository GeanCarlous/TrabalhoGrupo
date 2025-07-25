import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PerfilPage.css';

const PerfilPage = () => {
  // Estados para os dados do perfil

  const [profileData, setProfileData] = useState({
    nome: 'Aluno 1',
    curso: 'Engenharia de Software',
    semestre: '8º Semestre'
  });

  // Estados para controle da edição
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...profileData });
  const [isProfileVisible, setIsProfileVisible] = useState(true);

  // Hook para navegação
  const navigate = useNavigate();

  // Opções para os dropdowns
  const cursos = [
    'Engenharia de Software',
    'Ciência da Computação',
    'Sistemas de Informação',
    'Engenharia da Computação',
    'Análise e Desenvolvimento de Sistemas'
  ];

  const semestres = [
    '1º Semestre',
    '2º Semestre',
    '3º Semestre',
    '4º Semestre',
    '5º Semestre',
    '6º Semestre',
    '7º Semestre',
    '8º Semestre',
    '9º Semestre',
    '10º Semestre'
  ];

  // Funções para gerenciar a edição
  const handleEditClick = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleProfileVisibility = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  // Função para o botão de voltar
  const handleBackClick = () => {
    navigate('/home'); // Navega para a rota da homepage
  };

  return (
    <div className="perfil-page">
      {/* Background Icons */}
      <div className="background-icons">
        {/* Ícones decorativos do fundo */}
        <div className="icon icon-1">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
        <div className="icon icon-2">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <div className="icon icon-3">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
          </svg>
        </div>
        <div className="icon icon-4">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
          </svg>
        </div>
        <div className="icon icon-5">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2-7v2H5V4h3.5l1-1h5l1 1H19z"/>
          </svg>
        </div>
        <div className="icon icon-6">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="icon icon-7">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9V7h9v14z"/>
          </svg>
        </div>
        <div className="icon icon-8">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM8.5 16L12 13.5 15.5 16 12 18.5 8.5 16z"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="perfil-content">
        {/* Profile Card */}
        <div className="perfil-card">
          {/* Header */}
          <div className="perfil-header">
            <button className="back-button" onClick={handleBackClick}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
            </button>
            <h1>Perfil</h1>
          </div>

          {/* Nome Field */}
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            {isEditing ? (
              <input
                type="text"
                id="nome"
                value={editData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                className="form-input"
              />
            ) : (
              <div className="form-display">{profileData.nome}</div>
            )}
          </div>

          {/* Curso and Semestre Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="curso">Curso</label>
              {isEditing ? (
                <select
                  id="curso"
                  value={editData.curso}
                  onChange={(e) => handleInputChange('curso', e.target.value)}
                  className="form-select"
                >
                  {cursos.map((curso) => (
                    <option key={curso} value={curso}>
                      {curso}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="form-display">{profileData.curso}</div>
              )}
            </div>

              {/* FUNCIONALIDADE DE VISUALIZAÇÃO DO PERFIL
            <div className="form-group">
              <label htmlFor="semestre">Semestre</label>
              {isEditing ? (
                <select
                  id="semestre"
                  value={editData.semestre}
                  onChange={(e) => handleInputChange('semestre', e.target.value)}
                  className="form-select"
                >
                  {semestres.map((semestre) => (
                    <option key={semestre} value={semestre}>
                      {semestre}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="form-display">{profileData.semestre}</div>
              )}
            </div>
           */}
          </div>

          {/* FUNCIONALIDADE DE VISUALIZAÇÃO DO PERFIL */}
          {/* Visibility Toggle 
          <div className="visibility-toggle">
            <label className="toggle-container">
              <input
                type="checkbox"
                checked={isProfileVisible}
                onChange={toggleProfileVisibility}
                className="toggle-input"
              />
              <span className="toggle-slider"></span>
              <span className="toggle-text">Todos podem ver meu perfil</span>
            </label>
          </div>*/}

          {/* Action Buttons */}
          <div className="action-buttons">
            {isEditing ? (
              <div className="edit-buttons">
                <button className="btn-cancel" onClick={handleCancel}>
                  Voltar
                </button>
                <button className="btn-save" onClick={handleSave}>
                  Salvar
                </button>
              </div>
            ) : (
              <button className="btn-edit" onClick={handleEditClick}>
                Editar dados
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;