import React from 'react';
import './LoginPage.css';

export default function CadastroSucesso() {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(30,30,30,0.95)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
    }}>
      <div className="login-card" style={{ width: 320, height: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ marginBottom: 24 }}>
          <span style={{
            display: 'inline-block',
            width: 72,
            height: 72,
            background: '#2563eb',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="48" height="48" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="22" fill="#2563eb"/>
              <polyline points="16,24 22,30 32,18" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
        <div style={{ fontWeight: 600, fontSize: 16, marginTop: 8 }}>
          Cadastro efetuado com sucesso!!
        </div>
      </div>
    </div>
  );
}
