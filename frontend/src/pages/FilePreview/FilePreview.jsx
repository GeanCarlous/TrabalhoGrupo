import React from "react";

/**
 * Um componente que renderiza uma prévia de um ficheiro.
 * Mostra uma imagem se o tipo for imagem, um PDF em um iframe, ou um ícone de documento caso contrário.
 */
const FilePreview = ({ filePath, disciplina, fileType, fileOriginalName }) => {
  // Fallback para o caso de não haver um caminho de ficheiro
  if (!filePath) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          background: "#e5e7eb",
          color: "#6b7280",
        }}
      >
        <span>Sem prévia</span>
      </div>
    );
  }

  // Determina o tipo de arquivo usando o fileType
  const isImage = fileType && fileType.startsWith('image/');
  const isPDF = fileType === 'application/pdf';
  const isDocument = fileType && (
    fileType.includes('word') || 
    fileType.includes('excel') || 
    fileType.includes('powerpoint') ||
    fileType.includes('document')
  );
  const isArchive = fileType && fileType.includes('zip');

  // Se for uma imagem, renderiza a tag <img>
  if (isImage) {
    return (
      <img
        src={filePath}
        alt={disciplina}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        // Fallback caso a imagem específica falhe ao carregar
        onError={(e) => {
          e.target.onerror = null;
          e.target.style.display = "none";
          const parent = e.target.parentNode;
          if (parent) {
            parent.innerHTML = `<div style='display: flex; align-items: center; justify-content: center; height: 100%; background: #f3f4f6; color: #9ca3af;'>Imagem indisponível</div>`;
          }
        }}
      />
    );
  }

  // Se for um PDF, renderiza um iframe para visualização
  if (isPDF) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <iframe 
          src={`${filePath}#view=fitH`} 
          title="PDF Preview"
          style={{ flex: 1, border: 'none' }}
        />
        <div style={{ textAlign: 'center', padding: '8px', background: '#f3f4f6' }}>
          <a 
            href={filePath} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#2563eb', textDecoration: 'underline' }}
          >
            Abrir em nova janela
          </a>
        </div>
      </div>
    );
  }

  // Determina a extensão e ícone apropriados
  let fileExtension = "FILE";
  let iconPath = "";
  
  try {
    if (fileOriginalName && fileOriginalName.includes(".")) {
      fileExtension = fileOriginalName.split(".").pop().toUpperCase();
    }
    
    // Define ícones específicos para tipos conhecidos
    if (isDocument) {
      if (fileType.includes('word')) {
        iconPath = "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8";
      } else if (fileType.includes('excel')) {
        iconPath = "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M17 9l-5 5 M12 9v10 M7 9l5 5";
      } else if (fileType.includes('powerpoint')) {
        iconPath = "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M8 11v4 M12 11v4 M16 11v4 M8 17v.01 M12 17v.01 M16 17v.01";
      }
    } else if (isArchive) {
      iconPath = "M12 3v7m0 0v7m0-7h7m-7 0H5 M4 8h16 M4 12h16 M4 16h16";
    }
  } catch (error) {
    console.error("Erro ao processar informações do arquivo:", error);
  }

  // Renderiza um ícone de documento com a extensão
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #4f46e5, #2563eb)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        textAlign: "center",
        padding: "8px",
      }}
    >
      {/* Ícone de Documento SVG - Dinâmico para tipos específicos */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        {iconPath && <path d={iconPath}></path>}
      </svg>
      <span style={{ marginTop: "10px", fontWeight: "600", fontSize: "18px" }}>
        {fileExtension}
      </span>
    </div>
  );
};

export default FilePreview;