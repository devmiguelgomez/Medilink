import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { checkApiStatus } from './config/apiConfig';
import './index.css';
import './assets/styles.css';
import Header from './components/Header'; // Asegúrate de que esta ruta sea correcta
import Footer from './components/Footer'; // Verifica esta ruta
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PatientDashboard from './pages/paciente/Dashboard';
import ProfessionalDashboard from './pages/profesional/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import NotFoundPage from './pages/NotFoundPage'; // Página para rutas no encontradas
import { AuthProvider } from './context/AuthContext';
import { AppointmentsProvider } from './context/AppointmentsContext';

function App() {
  const [apiStatus, setApiStatus] = useState({ status: false, message: 'Verificando...' });

  useEffect(() => {
    const verifyApiConnection = async () => {
      const status = await checkApiStatus();
      setApiStatus(status);
    };

    verifyApiConnection();
  }, []);

  return (
    <AuthProvider>
      <AppointmentsProvider>
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
                <Route
                  path="/profesional/dashboard"
                  element={<ProfessionalDashboard />}
                />

                {/* Rutas protegidas para administradores */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />

                {/* Ruta para manejar páginas no encontradas */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AppointmentsProvider>
    </AuthProvider>
  );
}

export default App;