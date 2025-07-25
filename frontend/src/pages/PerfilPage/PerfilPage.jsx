import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './PerfilPage.css';
import { AuthContext } from '../../context/AuthContext';

const PerfilPage = () => {
    const navigate = useNavigate();
    const { user, token, isAuthenticated, updateUser } = useContext(AuthContext);

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ nome: '', curso: '' });
    const [cursos, setCursos] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Efeito para proteger a rota e buscar os cursos
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchCursos = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/cursos`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setCursos(data);
                }
            } catch (err) {
                setError('Falha ao carregar a lista de cursos.');
            }
        };

        fetchCursos();
    }, [isAuthenticated, navigate, token]);

    // Preenche os dados de edição quando o utilizador clica em "Editar"
    const handleEditClick = () => {
        setEditData({
            nome: user?.nome || '',
            curso: user?.curso_nome || ''
        });
        setIsEditing(true);
    };

    const handleCancel = () => setIsEditing(false);

    const handleInputChange = (field, value) => {
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editData)
            });

            const data = await response.json();

            if (response.ok) {
                updateUser(data.user); // Atualiza o contexto global com os novos dados
                setSuccess('Perfil atualizado com sucesso!');
                setIsEditing(false);
            } else {
                throw new Error(data.error || 'Falha ao atualizar o perfil.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="perfil-page">
            {/* Background Icons */}
            <div className="background-icons">
                <div className="icon icon-1"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg></div>
                <div className="icon icon-2"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div>
                <div className="icon icon-3"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/></svg></div>
                <div className="icon icon-4"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg></div>
                <div className="icon icon-5"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2-7v2H5V4h3.5l1-1h5l1 1H19z"/></svg></div>
                <div className="icon icon-6"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>
                <div className="icon icon-7"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9V7h9v14z"/></svg></div>
                <div className="icon icon-8"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM8.5 16L12 13.5 15.5 16 12 18.5 8.5 16z"/></svg></div>
            </div>

            <div className="perfil-content">
                <div className="perfil-card">
                    <div className="perfil-header">
                        <button className="back-button" onClick={() => navigate('/home')}>
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                        </button>
                        <h1>Perfil</h1>
                    </div>

                    {/* Notificações */}
                    {error && <p className="notification error">{error}</p>}
                    {success && <p className="notification success">{success}</p>}

                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="nome"
                                value={editData.nome}
                                onChange={(e) => handleInputChange('nome', e.target.value)}
                                className="form-input"
                                disabled={loading}
                            />
                        ) : (
                            <div className="form-display">{user?.nome || 'Não definido'}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="curso">Curso</label>
                        {isEditing ? (
                            <select
                                id="curso"
                                value={editData.curso}
                                onChange={(e) => handleInputChange('curso', e.target.value)}
                                className="form-select"
                                disabled={loading}
                            >
                                <option value="" disabled>Selecione seu curso</option>
                                {cursos.map((c) => (
                                    <option key={c.id} value={c.nome}>{c.nome}</option>
                                ))}
                            </select>
                        ) : (
                            <div className="form-display">{user?.curso_nome || 'Não definido'}</div>
                        )}
                    </div>

                    <div className="action-buttons">
                        {isEditing ? (
                            <div className="edit-buttons">
                                <button className="btn-cancel" onClick={handleCancel} disabled={loading}>Voltar</button>
                                <button className="btn-save" onClick={handleSave} disabled={loading}>
                                    {loading ? 'A salvar...' : 'Salvar'}
                                </button>
                            </div>
                        ) : (
                            <button className="btn-edit" onClick={handleEditClick}>Editar dados</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilPage;
