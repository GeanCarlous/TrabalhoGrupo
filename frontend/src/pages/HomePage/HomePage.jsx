import React, { useState, useEffect, useContext } from 'react';
import './HomePage.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import FilePreview from '../FilePreview/FilePreview';

const HomePage = () => {
    const [materials, setMaterials] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeNav, setActiveNav] = useState('acervo');

    // Estados para a pesquisa
    const [searchInput, setSearchInput] = useState('');
    const [submittedSearch, setSubmittedSearch] = useState('');

    const { user, token, logout, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    // Efeito para buscar as disciplinas
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchDisciplinas = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/disciplinas`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setDisciplinas(data.map(d => d.nome));
                } else {
                    throw new Error(data.error || 'Falha ao buscar disciplinas');
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchDisciplinas();
    }, [isAuthenticated, navigate, token]);

    // Efeito para buscar os materiais com base nos filtros
    useEffect(() => {
        if (!token) return;

        const fetchMaterials = async () => {
            setLoading(true);
            setError('');
            
            const params = new URLSearchParams();
            if (selectedTag) {
                params.append('disciplina', selectedTag);
            }
            if (submittedSearch) {
                params.append('search', submittedSearch);
            }

            const url = `${process.env.REACT_APP_API_URL}/materials?${params.toString()}`;

            // --- LINHA DE DIAGNÓSTICO ADICIONADA ---
            console.log("A fazer fetch para o URL:", url);

            try {
                const res = await fetch(url, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setMaterials(data);
                } else {
                    throw new Error(data.error || 'Falha ao buscar materiais');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMaterials();
    }, [selectedTag, submittedSearch, token]);

    const handleTagSelect = (tag) => {
        setSearchInput('');
        setSubmittedSearch('');
        setSelectedTag(tag);
        setIsDropdownOpen(false);
    };

    const clearFilter = () => {
        setSelectedTag(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        clearFilter();
        setSubmittedSearch(searchInput);
    };

    return (
        <div className="home-page" style={{ touchAction: 'pan-y' }}>
            {/* Sidebar Unificada */}
            <div className="sidebar">
                <div className="logo-container">
                    <Link to="/home">
                        <div className="logo">
                            <svg viewBox="0 0 100 100" className="logo-icon"><circle cx="50" cy="50" r="45" fill="white"/><g fill="black" stroke="black" strokeWidth="2"><path d="M25 35 L35 45 L25 55 M45 35 L55 45 L45 55 M65 35 L75 45 L65 55"/><circle cx="30" cy="65" r="3"/><circle cx="50" cy="65" r="3"/><circle cx="70" cy="65" r="3"/></g></svg>
                        </div>
                    </Link>
                </div>
                <nav className="nav-menu">
                    <Link to="/perfil" className={`nav-item ${activeNav === 'perfil' ? 'active' : ''}`} onClick={() => setActiveNav('perfil')}>
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                        <span>Perfil</span>
                    </Link>
                    <div className={`nav-item ${activeNav === 'acervo' ? 'active' : ''}`} onClick={() => setActiveNav('acervo')}>
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm16 16V5H5v14h14z"/><path d="M7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/></svg>
                        <span>Acervo</span>
                    </div>
                </nav>
                <div className="sidebar-bottom">
                    <Link to="/perfil" className="settings-btn" title="Editar Perfil">
                        <svg className="settings-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69-.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12-.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18-.5.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/></svg>
                    </Link>
                    <button onClick={handleLogout} className="settings-btn" title="Sair">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <header className="header">
                    <div className="breadcrumb">
                        <span>Home / Boas-vindas, {user?.nome || 'Aluno'}!</span>
                    </div>
                    <div className="header-center">
                        <form className="search-container" onSubmit={handleSearchSubmit}>
                            <input 
                                type="text" 
                                placeholder="Procurar por título..." 
                                className="search-input"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <button type="submit" className="search-btn">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                            </button>
                        </form>
                    </div>
                    <div className="header-actions">
                        <button className="header-btn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg></button>
                        <button className="header-btn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg></button>
                    </div>
                </header>

                <div className="filters-section">
                    <div className="filters-container">
                        <div className="filter-label">Filtrar por Disciplina:</div>
                        <div className="filter-controls">
                            <div className="dropdown-container">
                                <button className="dropdown-trigger" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <span>{selectedTag || 'Selecionar Disciplina'}</span>
                                    <svg className="dropdown-arrow" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
                                </button>
                                {isDropdownOpen && (
                                    <div className="dropdown-menu">
                                        {disciplinas.map((tag) => (
                                            <button key={tag} className="dropdown-item" onClick={() => handleTagSelect(tag)}>{tag}</button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {selectedTag && (
                                <div className="selected-tags">
                                    <div className="tag-pill">
                                        <span>{selectedTag}</span>
                                        <button className="tag-remove" onClick={clearFilter}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="content-area">
                    <section className="results-section">
                        <div className="results-header">
                            <h2>{submittedSearch ? `Resultados para "${submittedSearch}"` : (selectedTag ? `Resultados para ${selectedTag}` : 'Todos os Materiais')}</h2>
                        </div>
                        <div className="results-content">
                            {loading ? (
                                <p>A carregar materiais...</p>
                            ) : error ? (
                                <p className="error-message">{error}</p>
                            ) : (
                                <div className="cards-grid">
                                    {materials.length > 0 ? (
                                        materials.map((item) => (
                                            <Link to={`/material/${item.id}`} key={item.id} className="card-link">
                                                <div className="card">
                                                    <div className="card-image">
                                                        <FilePreview filepath={item.filepath} disciplina={item.disciplina} />
                                                        <div className="subject-tag">{item.disciplina}</div>
                                                    </div>
                                                    <div className="card-content">
                                                        <h3>{item.titulo}</h3>
                                                        <p className="professor">{item.orientador}</p>
                                                        <p className="uploader">Enviado por: {item.user_nome || 'Utilizador Removido'}</p>
                                                        <p className="tipo">{item.tipomaterial}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <p>Nenhum material encontrado para os filtros selecionados.</p>
                                    )}
                                </div>
                            )}
                            <Link to="/upload" className="floating-upload-btn">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg>
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
