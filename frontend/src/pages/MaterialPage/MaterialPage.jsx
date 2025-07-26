import React, { useState, useEffect, useContext } from 'react';
import './MaterialPage.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import FilePreview from '../FilePreview/FilePreview';

const MaterialPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token, isAuthenticated, user, logout } = useContext(AuthContext);

    const [material, setMaterial] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isDownloading, setIsDownloading] = useState(false); // Estado para o botão de download

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchMaterial = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/materials/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (response.ok) {
                    setMaterial(data);
                } else {
                    throw new Error(data.error || 'Material não encontrado');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMaterial();
    }, [id, token, isAuthenticated, navigate]);
    
    const handleDelete = async () => {
        const confirmed = window.confirm('Tem a certeza de que quer apagar este material? Esta ação não pode ser desfeita.');
        
        if (confirmed) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/materials/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (response.ok) {
                    alert('Material apagado com sucesso!');
                    navigate('/home');
                } else {
                    throw new Error(data.error || 'Não foi possível apagar o material.');
                }
            } catch (err) {
                setError(err.message);
                alert(`Erro: ${err.message}`);
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleDownload = async () => {
        if (!material || !material.filepath) return;
        setIsDownloading(true);
        setError('');

        try {
            const response = await fetch(material.filepath);
            if (!response.ok) {
                throw new Error('Não foi possível aceder ao ficheiro para download.');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', material.fileoriginalname || 'download');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError('Falha ao baixar o ficheiro.');
        } finally {
            setIsDownloading(false);
        }
    };


    if (loading) {
        return <div className="material-page-status">A carregar material...</div>;
    }

    if (error) {
        return <div className="material-page-status error">{error}</div>;
    }

    if (!material) {
        return <div className="material-page-status">Material não encontrado.</div>;
    }

    const isOwner = user && user.id === material.user_id;
    const isImage = material.filetype && material.filetype.startsWith('image/');

    return (
        <div className="material-page">
            <div className="sidebar">
                <div className="logo-container">
                    <Link to="/home">
                        <div className="logo">
                            <svg viewBox="0 0 100 100" className="logo-icon"><circle cx="50" cy="50" r="45" fill="white"/><g fill="black" stroke="black" strokeWidth="2"><path d="M25 35 L35 45 L25 55 M45 35 L55 45 L45 55 M65 35 L75 45 L65 55"/><circle cx="30" cy="65" r="3"/><circle cx="50" cy="65" r="3"/><circle cx="70" cy="65" r="3"/></g></svg>
                        </div>
                    </Link>
                </div>
                <nav className="nav-menu">
                    <Link to="/perfil" className="nav-item">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                        <span>Perfil</span>
                    </Link>
                    <Link to="/home" className="nav-item active">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm16 16V5H5v14h14z"/><path d="M7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/></svg>
                        <span>Acervo</span>
                    </Link>
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

            <div className="main-content">
                <header className="material-header">
                    <div className="header-top">
                        <Link to="/home" className="back-button">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg>
                        </Link>
                        <h1>Detalhes do Material</h1>
                    </div>
                </header>

                <div className="material-content">
                    <div className="material-card">
                        <div className="material-preview-area">
                            <FilePreview
                                filepath={material.filepath}
                                fileType={material.filetype}
                                disciplina={material.disciplina}
                            />
                        </div>
                        <div className="material-card-body">
                            <div className="material-title-section">
                                <h2 className="material-title">{material.titulo}</h2>
                            </div>
                            <div className="material-info">
                                <div className="info-item"><svg className="info-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" /></svg><span>{material.orientador}</span></div>
                                <div className="info-row">
                                    <div className="info-item"><span className="info-label">Disciplina:</span><span className="subject-tag">{material.disciplina}</span></div>
                                    <div className="info-item"><span className="info-label">Tipo:</span><span className="tipo-text">{material.tipomaterial}</span></div>
                                </div>
                                <div className="info-item"><span className="info-label">Data:</span><span>{material.dataobtencao}</span></div>
                                <div className="info-item"><span className="info-label">Enviado por:</span><span>{material.user_nome || "Utilizador Removido"}</span></div>
                            </div>
                            <div className="material-description">
                                <h3>Descrição</h3>
                                <p>{material.descricao || "Nenhuma descrição fornecida."}</p>
                            </div>
                            <div className="download-section">
                                {isOwner && (
                                    <button className="delete-btn" onClick={handleDelete}>
                                        <svg className="delete-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                                        <span>Apagar</span>
                                    </button>
                                )}
                                {isImage ? (
                                    <a href={material.filepath} target="_blank" rel="noopener noreferrer" className="download-btn">
                                        <svg className="download-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" /></svg>
                                        <span>Visualizar</span>
                                    </a>
                                ) : (
                                    <button className="download-btn" onClick={handleDownload} disabled={isDownloading}>
                                        <svg className="download-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" /></svg>
                                        <span>{isDownloading ? 'A baixar...' : 'Baixar'}</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaterialPage;
