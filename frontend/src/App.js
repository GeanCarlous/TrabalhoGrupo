import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa o nosso Provedor de Autenticação
import { AuthProvider } from './context/AuthContext';

// Importa todas as suas páginas
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import CadastroPage from './pages/CadastroPage/CadastroPage';
import MaterialUploadForm from './pages/MaterialUploadForm/MaterialUploadForm';
import PerfilPage from './pages/PerfilPage/PerfilPage';
import MaterialPage from './pages/MaterialPage/MaterialPage';

function App() {
  // O estado 'cadastro' foi removido pois a navegação agora é controlada pelas rotas.

  return (
    // O BrowserRouter deve ser o componente mais externo
    <BrowserRouter>
      {/* O AuthProvider envolve todas as rotas, 
          disponibilizando o contexto de autenticação para toda a aplicação. */}
      <AuthProvider>
        <Routes>
          {/* A rota para "/" foi removida para evitar duplicidade. 
              A página de login será a principal em "/login". */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/upload" element={<MaterialUploadForm />} />
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/material/:id" element={<MaterialPage />} />
          
          {/* Adicionamos uma rota "catch-all" para redirecionar o caminho raiz "/" para "/login" */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
