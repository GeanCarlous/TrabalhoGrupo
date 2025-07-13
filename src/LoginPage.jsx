import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ onCadastrar }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    setError(''); // Limpa mensagens de erro anteriores

    // Simulação de autenticação com localStorage (substitua pela sua lógica real)
    const storedEmail = localStorage.getItem('user_email');
    const storedPassword = localStorage.getItem('user_password');

    if (email === storedEmail && senha === storedPassword) {
      // Login bem-sucedido: redireciona para a HomePage
      navigate('/home');
    } else {
      // Credenciais inválidas: exibe uma mensagem de erro
      setError('Email ou senha incorretos.');
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2>Faça login.</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>  {/* Adiciona o onSubmit */}
          <label>Digite seu email institucional</label>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email institucional"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="icon user-icon"></span>
          </div>
          <label>Digite sua senha</label>
          <div className="input-group">
            <input
              type="password"
              placeholder="********"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <span className="icon eye-icon"></span>
          </div>
          <a href="#" className="forgot-link">esqueci minha senha</a>
          <button type="submit" className="login-btn">Entrar</button>
        </form>
        <div className="signup-link">
          não tem uma conta?{' '}
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              onCadastrar && onCadastrar();
            }}
          >
            Cadastrar-se
          </a>
        </div>
      </div>
    </div>
  );
}
