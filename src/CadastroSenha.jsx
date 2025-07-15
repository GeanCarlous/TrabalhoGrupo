import React, { useState } from 'react';
import './LoginPage.css';

export default function CadastroSenha({ email, onBack, onNext }) {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [touched, setTouched] = useState({ senha: false, confirmar: false });

  const isValidPassword = senha => senha.length >= 6;
  const passwordsMatch = senha === confirmarSenha && confirmarSenha.length > 0;

  const showPasswordError = touched.senha && senha && !isValidPassword(senha);
  const showMatchError = touched.confirmar && confirmarSenha && !passwordsMatch;

  const canProceed = isValidPassword(senha) && passwordsMatch;

  return (
    <div className="login-bg">
      <div className="login-card" style={{ minHeight: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: 24, marginTop: 0 }}>Criar senha</h2>
        
        <label style={{ textAlign: 'left', fontSize: '1.1rem', color: '#222', marginBottom: 8 }}>
          Digite sua senha
        </label>
        <div className="input-group" style={{ width: '100%', marginBottom: 8 }}>
          <input
            type="password"
            placeholder="Senha (mín. 6 caracteres)"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            onBlur={() => setTouched({ ...touched, senha: true })}
            style={{
              background: '#f7f7f7',
              border: 'none',
              borderRadius: 12,
              fontSize: '1rem',
              padding: '14px 4px 14px 16px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              width: '100%',
              borderColor: showPasswordError ? '#e53935' : undefined,
              outline: showPasswordError ? '1px solid #e53935' : undefined,
            }}
          />
        </div>
        {showPasswordError && (
          <div style={{ color: '#e53935', fontSize: 14, textAlign: 'left', width: '100%', marginBottom: 8 }}>
            A senha deve ter pelo menos 6 caracteres.
          </div>
        )}

        <label style={{ textAlign: 'left', fontSize: '1.1rem', color: '#222', marginBottom: 8, marginTop: 16 }}>
          Confirme sua senha
        </label>
        <div className="input-group" style={{ width: '100%', marginBottom: 8 }}>
          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChange={e => setConfirmarSenha(e.target.value)}
            onBlur={() => setTouched({ ...touched, confirmar: true })}
            style={{
              background: '#f7f7f7',
              border: 'none',
              borderRadius: 12,
              fontSize: '1rem',
              padding: '14px 4px 14px 16px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              width: '100%',
              borderColor: showMatchError ? '#e53935' : undefined,
              outline: showMatchError ? '1px solid #e53935' : undefined,
            }}
          />
        </div>
        {showMatchError && (
          <div style={{ color: '#e53935', fontSize: 14, textAlign: 'left', width: '100%', marginBottom: 8 }}>
            As senhas não coincidem.
          </div>
        )}

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
          <button
            onClick={onBack}
            style={{
              background: 'transparent',
              border: '1px solid #ccc',
              borderRadius: 12,
              padding: '12px 24px',
              cursor: 'pointer'
            }}
          >
            Voltar
          </button>
          
          <button
            onClick={() => canProceed && onNext({ email, senha })}
            disabled={!canProceed}
            style={{
              background: canProceed ? '#2563eb' : '#ccc',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '12px 24px',
              cursor: canProceed ? 'pointer' : 'not-allowed'
            }}
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
