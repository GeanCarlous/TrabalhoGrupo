import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salvar token no localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/home');
      } else {
        setError(data.error || 'Erro ao fazer login');
      }
    } catch (error) {
      setError('Erro de conexão com o servidor');
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2>Faça login.</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
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
          <Link to="/cadastro">Cadastrar-se</Link>
        </div>
      </div>
    </div>
  );
}
