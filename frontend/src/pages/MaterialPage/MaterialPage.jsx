import React from 'react';
import './MaterialPage.css';
import { useParams, Link } from 'react-router-dom';

const MaterialPage = () => {
  const { id } = useParams();
  
  // Dados mock para o material (normalmente viria de uma API)
  const materialData = {
    1: {
      id: 1,
      title: 'Prova 1 - turma ES',
      professor: 'Prof.ª grefit ghard',
      materia: 'Matemática básica',
      tipo: 'Prova',
      data: '25/07/2025',
      descricao: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
      downloadUrl: '/downloads/prova1-turma-es.pdf'
    }
  };

  const material = materialData[id] || materialData[1]; // Fallback para o primeiro material

  const handleDownload = () => {
    // Simular download do arquivo
    const link = document.createElement('a');
    link.href = material.downloadUrl;
    link.download = `${material.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="material-page">
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

      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <Link to="/home">
            <div className="logo">
              <svg viewBox="0 0 100 100" className="logo-icon">
                <circle cx="50" cy="50" r="45" fill="white"/>
                <g fill="black" stroke="black" strokeWidth="2">
                  <path d="M25 35 L35 45 L25 55 M45 35 L55 45 L45 55 M65 35 L75 45 L65 55"/>
                  <circle cx="30" cy="65" r="3"/>
                  <circle cx="50" cy="65" r="3"/>
                  <circle cx="70" cy="65" r="3"/>
                </g>
              </svg>
            </div>
          </Link>
        </div>
        
        <nav className="nav-menu">
          <Link to="/perfil" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span>Perfil</span>
          </Link>
          
          <Link to="/home" className="nav-item active">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h18v18H3V3zm16 16V5H5v14h14z"/>
              <path d="M7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
            </svg>
            <span>Acervo</span>
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <button className="settings-btn">
            <svg className="settings-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
            </svg>
          </button>
          
          <button className="collapse-btn">
            <svg className="collapse-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42Z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="material-header">
          <div className="header-top">
            <Link to="/home" className="back-button">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
            </Link>
            <h1>Material</h1>
          </div>
        </header>

        {/* Material Content */}
        <div className="material-content">
          <div className="material-card">
            {/* Material Title */}
            <div className="material-title-section">
              <h2 className="material-title">{material.title}</h2>
            </div>

            {/* Material Info */}
            <div className="material-info">
              <div className="info-item">
                <svg className="info-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
                <span>{material.professor}</span>
              </div>

              <div className="info-row">
                <div className="info-item">
                  <span className="info-label">Matéria:</span>
                  <span className="subject-tag">{material.materia}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Tipo:</span>
                  <span className="tipo-text">{material.tipo}</span>
                </div>
              </div>

              <div className="info-item">
                <span className="info-label">Data:</span>
                <span>{material.data}</span>
              </div>
            </div>

            {/* Description */}
            <div className="material-description">
              <h3>Descrição</h3>
              <p>{material.descricao}</p>
            </div>

            {/* Download Button */}
            <div className="download-section">
              <button className="download-btn" onClick={handleDownload}>
                <svg className="download-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                </svg>
                <span>Baixar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialPage;