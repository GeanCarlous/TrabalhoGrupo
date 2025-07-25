import React, { useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';


const HomePage = () => {
  // Estados para os filtros
  const [selectedTags, setSelectedTags] = useState(['Projeto de Analise de Algoritmos']);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [availableTags] = useState(['Projeto de Analise de Algoritmos', 'Programação Orientada a Objetos', 'Algebra Linear', 'Matemática Básica', 'Calculo 1', 'Pré Calculo', 'Programação Web', 'Banco de Dados', 'Engenharia de Software', 'Sistemas Operacionais', 'Redes de Computadores', 'Inteligência Artificial', 'Machine Learning', 'Data Science']);
  
  // Dados mock para os cards
  const recentItems = [
    {
      id: 1,
      title: 'Prova 1 - turma ES',
      professor: 'Prof.ª grefit ghard',
      tipo: 'Prova',
      materia: 'Matemática básica',
      data: '25/07/2025',
      descricao: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
      image: '/api/placeholder/200/120'
    },
    {
      id: 2,
      title: 'Prova 1 - turma ES',
      professor: 'Prof.ª grefit ghard',
      tipo: 'Prova',
      materia: 'Matemática básica',
      image: '/api/placeholder/200/120'
    },
    {
      id: 3,
      title: 'Prova 1 - turma ES',
      professor: 'Prof.ª grefit ghard',
      tipo: 'Prova',
      materia: 'Matemática básica',
      image: '/api/placeholder/200/120'
    },
    {
      id: 4,
      title: 'Prova 1 - turma ES',
      professor: 'Prof.ª grefit ghard',
      tipo: 'Prova',
      materia: 'Matemática básica',
      image: '/api/placeholder/200/120'
    },
    {
      id: 5,
      title: 'Prova 1 - turma ES',
      professor: 'Prof.ª grefit ghard',
      tipo: 'Prova',
      materia: 'Matemática básica',
      image: '/api/placeholder/200/120'
    },
    {
      id: 6,
      title: 'Prova 1 - turma ES',
      professor: 'Prof.ª grefit ghard',
      tipo: 'Prova',
      materia: 'Matemática básica',
      image: '/api/placeholder/200/120'
    },
    {
      id: 7,
      title: 'Prova 1 - turma ES',
      professor: 'Prof.ª grefit ghard',
      tipo: 'Prova',
      materia: 'Matemática básica',
      image: '/api/placeholder/200/120'
    },
    {
      id: 8,
      title: 'Prova 1 - turma ES',
      professor: 'Prof.ª grefit ghard',
      tipo: 'Prova',
      materia: 'Matemática básica',
      image: '/api/placeholder/200/120'
    }
  ];

  // Funções para gerenciar filtros
  const addTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setIsDropdownOpen(false);
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="home-page">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <Link to="/perfil">
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
          <div className="nav-item active">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span>Perfil</span>
          </div>
          
          <div className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h18v18H3V3zm16 16V5H5v14h14z"/>
              <path d="M7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
            </svg>
            <span>Acervo</span>
          </div>
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
        <header className="header">
          <div className="breadcrumb">
            <span>Home</span>
          </div>
          
          <div className="header-center">
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Procurar em acervo" 
                className="search-input"
              />
              <button className="search-btn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="header-actions">
            <button className="header-btn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
              </svg>
            </button>
            <button className="header-btn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
              </svg>
            </button>
          </div>
        </header>

         {/* Filters Section */}
        <div className="filters-section">
          <div className="filters-container">
            <div className="filter-label">Filtrar por:</div>
            
            <div className="filter-controls">
              {/* Dropdown de Tags */}
              <div className="dropdown-container">
                <button className="dropdown-trigger" onClick={toggleDropdown}>
                  <span>Tags</span>
                  <svg className="dropdown-arrow" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </button>
                
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    {availableTags.filter(tag => !selectedTags.includes(tag)).map((tag) => (
                      <button
                        key={tag}
                        className="dropdown-item"
                        onClick={() => addTag(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags Selecionadas */}
              <div className="selected-tags">
                {selectedTags.map((tag) => (
                  <div key={tag} className="tag-pill">
                    <span>{tag}</span>
                    <button 
                      className="tag-remove"
                      onClick={() => removeTag(tag)}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {/* Recently Viewed Section */}
          <section className="recently-viewed">
            <h2>Visto recentemente</h2>
            <div className="recent-item-single">
              <Link to={`/material/1`} className="card-link">
                <div className="card">
                  <div className="card-image">
                    <img src="/api/placeholder/200/120" alt="Matemática básica" />
                    <div className="subject-tag">Matemática básica</div>
                  </div>
                  <div className="card-content">
                    <h3>Prova 1 - turma ES</h3>
                    <p className="professor">Prof.ª grefit ghard</p>
                    <p className="tipo">Prova</p>
                  </div>
                </div>
              </Link>
            </div>
          </section>

         
          {/* Results Section */}
          <section className="results-section">
            <div className="results-header">
              <h2>Resultados obtidos</h2>
            </div>
            
            <div className="results-content">
              <div className="cards-grid">
                {/* Cards normais */}
                {recentItems.map((item) => (
                  <Link to={`/material/${item.id}`} key={item.id} className="card-link">
                    <div className="card">
                      <div className="card-image">
                        <img src={item.image} alt={item.materia} />
                        <div className="subject-tag">{item.materia}</div>
                      </div>
                      <div className="card-content">
                        <h3>{item.title}</h3>
                        <p className="professor">{item.professor}</p>
                        <p className="tipo">{item.tipo}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="pagination">
                <button className="pagination-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                  </svg>
                </button>
                <span className="pagination-info">1</span>
                <button className="pagination-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                  </svg>
                </button>
              </div>

              {/* Upload Button */}
              <Link to="/upload" className="floating-upload-btn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;