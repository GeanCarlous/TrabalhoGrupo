import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "./style.css"; // Certifique-se de que o caminho para o seu CSS está correto
import { AuthContext } from "../../context/AuthContext";

const MaterialUploadForm = () => {
    const navigate = useNavigate();
    const { token, isAuthenticated } = useContext(AuthContext);
    const fileInputRef = useRef(null); // Ref para aceder ao input do ficheiro

    const [formData, setFormData] = useState({
        titulo: "",
        dataObtencao: "",
        tipoMaterial: "",
        disciplina: "",
        orientador: "",
        descricao: "",
    });

    const [dragActive, setDragActive] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [tiposMaterial, setTiposMaterial] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [orientadores, setOrientadores] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Efeito para buscar dados iniciais
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchData = async (endpoint, setter) => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) setter(data);
            } catch (err) {
                setError(`Falha ao carregar ${endpoint}.`);
            }
        };

        fetchData('tipos-material', setTiposMaterial);
        fetchData('disciplinas', setDisciplinas);

    }, [isAuthenticated, navigate, token]);

    // Efeito para buscar orientadores
    useEffect(() => {
        if (!formData.disciplina || disciplinas.length === 0) {
            setOrientadores([]);
            return;
        }
        
        const disciplinaObj = disciplinas.find(d => d.nome === formData.disciplina);
        
        if (disciplinaObj) {
            const url = `${process.env.REACT_APP_API_URL}/orientadores/por-disciplina/${disciplinaObj.id}`;
            fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(data => setOrientadores(Array.isArray(data) ? data : []))
            .catch(() => setOrientadores([]));
        }
    }, [formData.disciplina, disciplinas, token]);
    
    // Efeito para limpar notificações automaticamente
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [success]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'disciplina') {
            setFormData(prev => ({ ...prev, disciplina: value, orientador: '' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

    const handleFileSelection = (file) => {
        if (!file) return;
        
        // Limpa o erro anterior para que a nova mensagem possa aparecer
        setError('');

        if (file.size > MAX_FILE_SIZE) {
            // Define o erro e limpa o input para permitir uma nova seleção do mesmo ficheiro
            setError('O ficheiro excede o limite de 10MB.');
            setUploadedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            return;
        }
        setUploadedFile(file);
    };

    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        handleFileSelection(file);
    };
    
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer.files && e.dataTransfer.files[0];
        handleFileSelection(file);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === "dragenter" || e.type === "dragover");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!uploadedFile) {
            setError("Por favor, anexe um arquivo antes de enviar.");
            return;
        }
        
        setLoading(true);

        const data = new FormData();
        data.append("titulo", formData.titulo);
        if (formData.dataObtencao) {
            const [ano, mes, dia] = formData.dataObtencao.split('-');
            data.append("dataObtencao", `${dia}-${mes}-${ano}`);
        }
        data.append("tipoMaterial", formData.tipoMaterial);
        data.append("disciplina", formData.disciplina);
        data.append("orientador", formData.orientador);
        data.append("descricao", formData.descricao);
        data.append("file", uploadedFile);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/materials`, {
                method: "POST",
                headers: { 'Authorization': `Bearer ${token}` },
                body: data,
            });

            const responseData = await response.json();

            if (response.ok) {
                setSuccess("Material enviado com sucesso! A redirecionar...");
                setTimeout(() => navigate("/home"), 2000);
            } else {
                setError(responseData.error || "Erro ao enviar material. Verifique os campos.");
            }
        } catch (err) {
            setError("Erro de conexão com o servidor.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => navigate("/home");

    return (
    <div className="upload-container">
        {error && <div className="notification error">{error}</div>}
        {success && <div className="notification success">{success}</div>}
        
        <div className="upload-form">
            <h2 className="form-title">O material enviado poderá ser acessado por outros alunos</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="upload-section">
                        <p className="upload-label">formatos suportados: .png, .pdf, .zip ou .docx</p>
                        <label
                            htmlFor="file-upload"
                            className={`upload-area ${dragActive ? "drag-active" : ""}`}
                            onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                id="file-upload"
                                className="file-input"
                                onChange={handleFileChange}
                                accept=".png,.pdf,.zip,.docx,.jpg"
                            />
                            <div className="upload-content">
                                <div className="upload-icon-wrapper">
                                    {dragActive ? '📁' : '⬇️'}
                                </div>
                                <span className="upload-text">
                                    {dragActive ? 'Solte o arquivo aqui' : 'Arraste o arquivo até aqui '}
                                </span>
                            </div>
                            {uploadedFile && (
                                <div className="uploaded-file-info">
                                    <span>✅ {uploadedFile.name}</span>
                                </div>
                            )}
                        </label>
                        <div className="description-section">
                            <label className="field-label" htmlFor="descricao">Descrição</label>
                            <textarea
                                id="descricao"
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleInputChange}
                                className="description-textarea"
                                placeholder="Descreva o material enviado"
                            />
                        </div>
                    </div>

                    <div className="form-fields">
                        <div className="field-row-responsive">
                            <div className="field-group">
                                <label className="field-label" htmlFor="titulo">Título do material <span className="required-star">*</span></label>
                                <input
                                    type="text"
                                    id="titulo"
                                    name="titulo"
                                    value={formData.titulo}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                            <div className="field-group">
                                <label className="field-label" htmlFor="dataObtencao">Data de obtenção <span className="required-star">*</span></label>
                                <input
                                    type="date"
                                    id="dataObtencao"
                                    name="dataObtencao"
                                    value={formData.dataObtencao}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>
                        <div className="field-row-responsive">
                            <div className="field-group">
                                <label className="field-label" htmlFor="tipoMaterial">Tipo de material <span className="required-star">*</span></label>
                                <select
                                    id="tipoMaterial"
                                    name="tipoMaterial"
                                    value={formData.tipoMaterial}
                                    onChange={handleInputChange}
                                    className="form-select"
                                    required
                                >
                                    <option value="" disabled>Selecione o tipo</option>
                                    {tiposMaterial.map((tipo) => <option key={tipo.id} value={tipo.nome}>{tipo.nome}</option>)}
                                </select>
                            </div>
                            <div className="field-group">
                                <label className="field-label" htmlFor="disciplina">Disciplina <span className="required-star">*</span></label>
                                <select
                                    id="disciplina"
                                    name="disciplina"
                                    value={formData.disciplina}
                                    onChange={handleInputChange}
                                    className="form-select"
                                    required
                                >
                                    <option value="" disabled>Selecione a disciplina</option>
                                    {disciplinas.map((d) => <option key={d.id} value={d.nome}>{d.nome}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="field-group">
                            <label className="field-label" htmlFor="orientador">Orientador <span className="required-star">*</span></label>
                            <select
                                id="orientador"
                                name="orientador"
                                value={formData.orientador}
                                onChange={handleInputChange}
                                className="form-select"
                                required
                                disabled={!formData.disciplina || orientadores.length === 0}
                            >
                                <option value="" disabled>Selecione o orientador</option>
                                {orientadores.map((o) => <option key={o.id} value={o.nome}>{o.nome}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="button-group">
                    <button type="button" className="btn btn-cancel" onClick={handleCancel} disabled={loading}>
                        cancelar
                    </button>
                    <button type="submit" className="btn btn-submit" disabled={loading}>
                        {loading ? 'A enviar...' : 'Enviar'}
                        <span className="send-icon">↗</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
);
}

export default MaterialUploadForm;

