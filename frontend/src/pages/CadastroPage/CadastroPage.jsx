import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CadastroEmail from '../CadastroEmail/CadastroEmail';
import CadastroSenha from '../CadastroSenha/CadastroSenha';

export default function CadastroPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleEmailNext = (emailValue) => {
    setEmail(emailValue);
    setCurrentStep(2);
  };

  const handlePasswordBack = () => {
    setCurrentStep(1);
  };

  // Função de registo simplificada
  const handleRegister = async (passwordData) => {
    setLoading(true);
    setError('');
    setSuccess('');

    const apiUrl = `${process.env.REACT_APP_API_URL}/auth/register`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email, // Email do estado
          password: passwordData.senha // Senha do componente filho
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Cadastro realizado com sucesso! ');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.error || 'Erro ao cadastrar utilizador');
      }
    } catch (error) {
      setError('Não foi possível conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  // Ecrã de carregamento
  if (loading) {
    return (
      <div className="login-bg">
        <div className="login-card" style={{ textAlign: 'center' }}>
          <h2>A criar a sua conta...</h2>
          <p>Aguarde um momento</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Notificação de Erro */}
      {error && (
        <div style={{ position: 'fixed', top: 20, right: 20, background: '#e53935', color: 'white', padding: '12px 20px', borderRadius: 8, zIndex: 1000, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          {error}
        </div>
      )}

      {/* Notificação de Sucesso */}
      {success && (
        <div style={{ position: 'fixed', top: 20, right: 20, background: '#43a047', color: 'white', padding: '12px 20px', borderRadius: 8, zIndex: 1000, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          {success}
        </div>
      )}
      
      {/* Renderização Condicional dos Passos */}
      {currentStep === 1 && (
        <CadastroEmail onNext={handleEmailNext} />
      )}
      
      {currentStep === 2 && (
        <CadastroSenha 
          email={email} // Passa o email para exibição, se necessário
          onBack={handlePasswordBack}
          onNext={handleRegister}
        />
      )}
    </div>
  );
}
