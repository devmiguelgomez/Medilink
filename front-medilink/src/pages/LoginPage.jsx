import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';
import '../assets/styles.css';

function LoginPage() {
  const { isLoggedIn, currentUser } = useAuth();
  const [showLoginForm, setShowLoginForm] = useState(false);

  // Redireccionar si el usuario ya está autenticado
  if (isLoggedIn && currentUser) {
    const role = currentUser.role;
    
    if (role === 'patient') {
      return <Navigate to="/paciente/dashboard" replace />;
    } else if (role === 'doctor') {
      return <Navigate to="/profesional/dashboard" replace />;
    } else if (role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1>MediLink</h1>
            <p>Plataforma de Gestión Médica</p>
          </div>
          
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
