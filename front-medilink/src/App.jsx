import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  return (
    <AuthProvider>
      <AppointmentsProvider>
        <Router>
          <Header />
          <main style={{ minHeight: '80vh', padding: '20px' }}>
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
        </Router>
      </AppointmentsProvider>
    </AuthProvider>
  );
}

export default App;