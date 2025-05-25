import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { checkApiStatus } from './config/apiConfig';
import './index.css';
import './assets/styles.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PatientDashboard from './pages/paciente/Dashboard';
import ProfessionalDashboard from './pages/profesional/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [apiStatus, setApiStatus] = useState({ status: false, message: 'Verificando...' });

  useEffect(() => {
    const verifyApiConnection = async () => {
      try {
        const status = await checkApiStatus();
        setApiStatus(status);
      } catch (error) {
        console.error('Error verificando API:', error);
        setApiStatus({ 
          status: false, 
          message: 'Error al conectar con la API' 
        });
      }
    };

    verifyApiConnection();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <div className="api-status">
            Estado API: 
            <span className={apiStatus.status ? 'status-ok' : 'status-error'}>
              {apiStatus.status ? ' Conectado' : ' Desconectado'}
            </span>
          </div>
          <main style={{ minHeight: '80vh', padding: '20px' }} className="container">
            <Routes>
              {/* Rutas públicas */}
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Rutas protegidas para pacientes */}
              <Route path="/paciente/dashboard" element={<PatientDashboard />} />

              {/* Rutas protegidas para profesionales */}
              <Route path="/profesional/dashboard" element={<ProfessionalDashboard />} />

              {/* Rutas protegidas para administradores */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* Ruta para manejar páginas no encontradas */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;