import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./style.css";

const MaterialUploadForm = () => {
const navigate = useNavigate(); // Hook para navegação

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

  // Estados para listas dinâmicas
  const [tiposMaterial, setTiposMaterial] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [orientadores, setOrientadores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tipos-material")
      .then((res) => res.json())
      .then((data) => setTiposMaterial(data))
      .catch(() => setTiposMaterial([]));

    fetch("http://localhost:5000/api/disciplinas")
      .then((res) => res.json())
      .then((data) => setDisciplinas(data))
      .catch(() => setDisciplinas([]));
  }, []);

  // Buscar orientadores filtrados por disciplina
  useEffect(() => {
    if (formData.disciplina) {
      const disciplinaObj = disciplinas.find(
        (d) => d.nome === formData.disciplina
      );
      if (disciplinaObj) {
        fetch(
          `http://localhost:5000/api/orientadores/por-disciplina/${disciplinaObj.id}`
        )
          .then((res) => res.json())
          .then((data) => setOrientadores(Array.isArray(data) ? data : []))
          .catch(() => setOrientadores([]));
      }
    } else {
      setOrientadores([]);
    }
  }, [formData.disciplina, disciplinas]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file) => {
    const allowedTypes = [".png", ".pdf", ".zip", ".docx",".jpg"];
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();

    if (allowedTypes.includes(fileExtension)) {
      setUploadedFile(file);
    } else {
      alert("Formato não suportado. Use: .png, .pdf, .jpg, .zip ou .docx");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Trecho inserido aqui para validação
    if (!uploadedFile) {
      alert("Por favor, anexe um arquivo antes de enviar.");
      return; // Impede o restante da função de executar
    }

    const data = new FormData();
    data.append("titulo", formData.titulo);
    data.append("dataObtencao", formData.dataObtencao);
    data.append("tipoMaterial", formData.tipoMaterial);
    data.append("disciplina", formData.disciplina);
    data.append("orientador", formData.orientador);
    data.append("descricao", formData.descricao);
    if (uploadedFile) data.append("file", uploadedFile);

    try {
      const response = await fetch("http://localhost:5000/api/materials", {
        method: "POST",
        body: data,
      });
      if (response.ok) {
        alert("Material enviado com sucesso!");
        navigate("/home"); // Redireciona para a página inicial após o envio
      } else {
        alert("Erro ao enviar material.");
      }
    } catch (err) {
      alert("Erro de conexão com o servidor.");
    }
  };

  const handleCancel = () => {
    setFormData({
      titulo: "",
      dataObtencao: "",
      tipoMaterial: "",
      disciplina: "",
      orientador: "",
      descricao: "",
    });
    setUploadedFile(null);
    navigate("/home"); // Redireciona para a página inicial ao cancelar
  };

  return (
    <div className="upload-container">
      <div className="upload-form">
        <h2 className="form-title">
          O material enviado poderá ser acessado por outros alunos
        </h2>

        <div className="form-row">
          {/* Seção de Upload */}
          <div className="upload-section">
            <p className="upload-label">
              formatos suportados: .png, .pdf, .zip ou .docx
            </p>

            <div
              className={`upload-area ${dragActive ? "drag-active" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                className="file-input"
                onChange={handleFileChange}
                accept=".png,.pdf,.zip,.docx"
              />
              <label htmlFor="file-upload" className="upload-label-button">
                <div className="upload-icon">↓</div>
                <span>Arraste o arquivo até aqui</span>
              </label>
              {uploadedFile && (
                <div className="uploaded-file">
                  <span> {uploadedFile.name}</span>
                </div>
              )}
            </div>

            <div className="description-section">
              <label htmlFor="descricao">Descrição</label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                className="description-input"
                placeholder="Descreva o material enviado"
              />
            </div>
          </div>

          {/* Campos do Formulário */}
          <div className="form-fields">
            <div className="field-row">
              <div className="field-group">
                <label htmlFor="titulo">
                  Título do material <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  className="text-input"
                  required
                />
              </div>

              <div className="field-group">
                <label htmlFor="dataObtencao">Data de obtenção</label>
                <input
                  type="date"
                  id="dataObtencao"
                  name="dataObtencao"
                  value={formData.dataObtencao}
                  onChange={handleInputChange}
                  className="date-input"
                  placeholder="DD/MM/AAAA"
                />
              </div>
            </div>

            <div className="field-row">
              <div className="field-group">
                <label htmlFor="tipoMaterial">
                  Tipo de material <span className="required">*</span>
                </label>
                <select
                  id="tipoMaterial"
                  name="tipoMaterial"
                  value={formData.tipoMaterial}
                  onChange={handleInputChange}
                  className="select-input"
                  required
                >
                  <option value="" disabled hidden>
                    Tipo de material
                  </option>
                  {tiposMaterial.map((tipo) => (
                    <option key={tipo.id} value={tipo.nome}>
                      {tipo.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label htmlFor="disciplina">
                  Disciplina <span className="required">*</span>
                </label>
                <select
                  id="disciplina"
                  name="disciplina"
                  value={formData.disciplina}
                  onChange={handleInputChange}
                  className="select-input"
                  required
                >
                  <option value="" disabled hidden>
                    Disciplina
                  </option>
                  {disciplinas.map((disciplina) => (
                    <option key={disciplina.id} value={disciplina.nome}>
                      {disciplina.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="orientador">Orientador</label>
              <select
                id="orientador"
                name="orientador"
                value={formData.orientador}
                onChange={handleInputChange}
                className="select-input"
              >
                <option value="" disabled hidden>
                  Orientador
                </option>
                {orientadores.map((orientador) => (
                  <option key={orientador.id} value={orientador.nome}>
                    {orientador.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="button-group">
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            cancelar
          </button>

          <button
            type="button"
            className="submit-button"
            onClick={handleSubmit}
          >
            Enviar
            <span className="send-icon">↗</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialUploadForm;