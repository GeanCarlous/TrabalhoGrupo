import './App.css';
import React, { useState } from 'react';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage'; // Importe HomePage
import CadastroPage from './pages/CadastroPage/CadastroPage'; // Importe CadastroPage
import MaterialUploadForm from './pages/MaterialUploadForm/MaterialUploadForm'; // Importe MaterialUploadForm
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importe BrowserRouter, Routes e Route
import PerfilPage from './pages/PerfilPage/PerfilPage';
import MaterialPage from './pages/MaterialPage/MaterialPage';

function App() {
  const [cadastro, setCadastro] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage />
          }
        />
        <Route
          path="/cadastro"
          element={<CadastroPage />}
        />
        <Route
          path="/home"
          element={<HomePage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/upload"
          element={<MaterialUploadForm />}
        />
        <Route
          path="/perfil"
          element={<PerfilPage />}
        />
        <Route
          path="/material/:id"
          element={<MaterialPage />}
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
