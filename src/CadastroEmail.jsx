import React, { useState } from 'react';
import './LoginPage.css';

export default function CadastroEmail({ onNext }) {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  // Validação para email institucional da UFC
  const isValidEmail = email =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.endsWith('alu.ufc.br');

  const showError = touched && email && !isValidEmail(email);

  return (
    <div className="login-bg">
      <div className="login-card" style={{ minHeight: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: 24, marginTop: 0 }}>Cadastrar-se</h2>
        <label style={{ textAlign: 'left', fontSize: '1.1rem', color: '#222', marginBottom: 8 }}>
          Digite seu email institucional
        </label>
        <div className="input-group" style={{ width: '100%', marginBottom: 8 }}>
          <input
            type="email"
            placeholder="seu.nome@alu.ufc.br"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            onKeyPress={e => e.key === 'Enter' && isValidEmail(email) && onNext(email)}
            style={{
              background: '#f7f7f7',
              border: 'none',
              borderRadius: 12,
              fontSize: '1rem',
              padding: '14px 4px 14px 16px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              width: '100%',
              borderColor: showError ? '#e53935' : undefined,
              outline: showError ? '1px solid #e53935' : undefined,
            }}
          />
          <span className="icon user-icon"></span>
        </div>
        {showError && (
          <div style={{ color: '#e53935', fontSize: 14, textAlign: 'left', width: '100%', marginBottom: 8 }}>
            Email institucional deve terminar com @alu.ufc.br
          </div>
        )}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            className="login-btn circle"
            onClick={() => isValidEmail(email) && onNext(email)}
            type="button"
            style={{
              background: isValidEmail(email) ? '#2563eb' : '#ccc',
              color: '#fff',
              border: 'none',
              width: 56,
              height: 56,
              borderRadius: '50%',
              fontSize: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
              marginLeft: 0,
              cursor: isValidEmail(email) ? 'pointer' : 'not-allowed'
            }}
            disabled={!isValidEmail(email)}
            aria-label="Avançar"
          >
            <svg width="28" height="28" viewBox="0 0 28 28">
              <polygon points="8,6 22,14 8,22" fill="white"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
