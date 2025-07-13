import React, { useState } from 'react';
import './LoginPage.css';

export default function CadastroSenha({ onSubmit, email }) {
  const [senha, setSenha] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);

  const isValid = senha && confirm && senha === confirm;

  function handleSubmit() {
    if (isValid) {
      // Salva no localStorage
      if (email) {
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_password', senha);
      }
      onSubmit(senha);
    }
  }

  return (
    <div className="login-card">
      <h2>Cadastrar-se</h2>
      <label>Crie sua senha</label>
      <div className="input-group">
        <input
          type={show ? 'text' : 'password'}
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />
        <span
          className="icon eye-icon"
          style={{ cursor: 'pointer' }}
          onClick={() => setShow(!show)}
        ></span>
      </div><br/>
      <label>Confirme sua senha</label>
      <div className="input-group">
        <input
          type={show ? 'text' : 'password'}
          placeholder="Senha"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
        />
        <span
          className="icon eye-icon"
          style={{ cursor: 'pointer' }}
          onClick={() => setShow(!show)}
        ></span>
      </div>
      <button
        className="login-btn"
        style={{ marginTop: 24 }}
        onClick={handleSubmit}
        type="button"
        disabled={!isValid}
      >
        Concluir cadastro
      </button>
    </div>
  );
}
