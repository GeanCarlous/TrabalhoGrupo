import React, { useState } from 'react';
import CadastroEmail from './CadastroEmail';
import CadastroSenha from './CadastroSenha';
import CadastroSucesso from './CadastroSucesso';

export default function CadastroPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <div className="login-bg">
      {step === 1 && (
        <CadastroEmail
          onNext={email => {
            setEmail(email);
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <CadastroSenha
          email={email}
          onSubmit={senha => {
            setSenha(senha);
            setStep(3);
          }}
        />
      )}
      {step === 3 && <CadastroSucesso />}
    </div>
  );
}
