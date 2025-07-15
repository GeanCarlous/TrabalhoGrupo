import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CadastroEmail from '../CadastroEmail/CadastroEmail';
import CadastroSenha from '../CadastroSenha/CadastroSenha';

export default function CadastroPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailNext = (emailValue) => {
    setEmail(emailValue);
    setCurrentStep(2);
  };

  const handlePasswordBack = () => {
    setCurrentStep(1);
  };

  const handleRegister = async (userData) => {
    setLoading(true);
    setError('');

    try {
      console.log('Dados do usuário:', userData);
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          senha: userData.senha
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Cadastro realizado com sucesso
        alert('Cadastro realizado com sucesso! Faça login para continuar.');
        navigate('/login');
      } else {
        setError(data.error || 'Erro ao cadastrar usuário');
      }
    } catch (error) {
      setError('Erro de conexão com o servidor');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="login-bg">
        <div className="login-card" style={{ textAlign: 'center' }}>
          <h2>Criando sua conta...</h2>
          <p>Aguarde um momento</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div style={{ 
          position: 'fixed', 
          top: 20, 
          right: 20, 
          background: '#e53935', 
          color: 'white', 
          padding: '12px 20px', 
          borderRadius: 8,
          zIndex: 1000
        }}>
          {error}
        </div>
      )}
      
      {currentStep === 1 && (
        <CadastroEmail onNext={handleEmailNext} />
      )}
      
      {currentStep === 2 && (
        <CadastroSenha 
          email={email}
          onBack={handlePasswordBack}
          onNext={handleRegister}
        />
      )}
    </div>
  );
}
