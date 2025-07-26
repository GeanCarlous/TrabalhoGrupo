import React from "react";

const FilePreview = ({ filePath, disciplina, fileType, fileOriginalName }) => {
  if (!filePath) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        background: "#e5e7eb",
        color: "#6b7280",
      }}>
        <span>Sem prévia</span>
      </div>
    );
  }

  const isImage = fileType?.startsWith('image/');
  const isPDF = fileType === 'application/pdf';
  const isDocument = fileType?.includes('word') || fileType?.includes('excel') || 
                     fileType?.includes('powerpoint') || fileType?.includes('document');
  const isArchive = fileType?.includes('zip');

  // Imagens
  if (isImage) {
    return (
      <img
        src={filePath}
        alt={disciplina}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.style.display = "none";
          const fallback = document.createElement('div');
          fallback.style = 'display: flex; align-items: center; justify-content: center; height: 100%; background: #f3f4f6; color: #9ca3af;';
          fallback.textContent = 'Imagem indisponível';
          e.target.parentNode.appendChild(fallback);
        }}
      />
    );
  }

  // PDFs
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

  // Outros arquivos (documentos, zip, etc)
  let fileExtension = "FILE";
  try {
    if (fileOriginalName?.includes(".")) {
      fileExtension = fileOriginalName.split('.').pop().toUpperCase();
    }
  } catch (error) {
    console.error("Erro ao obter extensão:", error);
  }

  return (
    <div style={{
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
    }}>
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
        
        {/* Ícones específicos */}
        {isDocument && <path d="M16 13H8 M16 17H8 M10 9H8"></path>}
        {isArchive && <path d="M4 8h16 M4 12h16 M4 16h16"></path>}
      </svg>
      
      <span style={{ marginTop: "10px", fontWeight: "600", fontSize: "18px" }}>
        {fileExtension}
      </span>
    </div>
  );
};

export default FilePreview;