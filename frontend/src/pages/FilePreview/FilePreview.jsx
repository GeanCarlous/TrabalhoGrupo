import React from "react";

/**
 * Um componente que renderiza uma prévia de um ficheiro.
 * Mostra uma imagem se a URL for de uma imagem, ou um ícone de documento caso contrário.
 */
const FilePreview = ({ filePath, disciplina, fileOriginalName }) => {
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

  // Verifica se a URL termina com uma extensão de imagem comum
  const isImage = /\.(jpe?g|png|gif|webp)$/i.test(filePath);

  if (isImage) {
    // Se for uma imagem, renderiza a tag <img>
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
            parent.innerHTML += `<div style='display: flex; align-items: center; justify-content: center; height: 100%; background: #f3f4f6; color: #9ca3af;'>Imagem indisponível</div>`;
          }
        }}
      />
    );
  }

  // Se não for uma imagem, renderiza um ícone de documento
  // Extrai a extensão do arquivo da última parte da URL ou do nome original
  let fileType = "";
  try {
    const urlPath = filePath.split("?")[0]; // Remove parâmetros da URL
    const lastSegment = urlPath.split("/").pop(); // Pega o último segmento
    if (lastSegment.includes(".")) {
      fileType = lastSegment.split(".").pop().toUpperCase();
    } else if (fileOriginalName && fileOriginalName.includes(".")) {
      fileType = fileOriginalName.split(".").pop().toUpperCase();
    } else {
      fileType = "FILE";
    }
  } catch {
    fileType = "FILE";
  }
  // Não exibe o nome do arquivo, apenas o ícone e a extensão
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
      {/* Ícone de Documento SVG */}
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
      </svg>
      <span style={{ marginTop: "10px", fontWeight: "600", fontSize: "18px" }}>
        {fileType}
      </span>
    </div>
  );
};

export default FilePreview;
