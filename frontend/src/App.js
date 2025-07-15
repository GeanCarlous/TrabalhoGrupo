import './App.css';
import React, { useState } from 'react';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage'; // Importe HomePage
import CadastroPage from './pages/CadastroPage/CadastroPage'; // Importe CadastroPage
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importe BrowserRouter, Routes e Route

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
