import './App.css';
import React, { useState } from 'react';
import LoginPage from './LoginPage';
import HomePage from './HomePage'; // Importe HomePage
import CadastroPage from './CadastroPage';
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
