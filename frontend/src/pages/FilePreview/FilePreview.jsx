import React from 'react';

// As props agora são filepath e filetype (lowercase) para corresponder ao backend
const FilePreview = ({ filepath, filetype, disciplina }) => {
  // Fallback se não houver caminho de ficheiro
  if (!filepath) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#e5e7eb', color: '#6b7280' }}>
        <span>Sem prévia</span>
      </div>
    );
  }

  // A lógica usa 'filetype' (lowercase)
  const isImage = filetype && filetype.startsWith('image/');

  if (isImage) {
    // Se for uma imagem, renderiza a tag <img>
    return (
      <img 
        src={filepath} // Usa 'filepath' (lowercase)
        alt={disciplina} 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.outerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f3f4f6; color: #9ca3af;">Imagem indisponível</div>`;
        }}
      />
    );
  }

  // Se não for uma imagem, mostra um ícone de documento
  let fileExtension = "FICHEIRO";
  if (filetype) {
    if (filetype.includes('pdf')) fileExtension = 'PDF';
    else if (filetype.includes('word')) fileExtension = 'DOCX';
    else if (filetype.includes('zip') || filetype.includes('archive')) fileExtension = 'ZIP';
  }
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, #6b7280, #4a5568)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      textAlign: 'center',
      padding: '8px',
    }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
      </svg>
      <span style={{ marginTop: '12px', fontWeight: '600', fontSize: '20px' }}>
        {fileExtension}
      </span>
    </div>
  );
};

export default FilePreview;
