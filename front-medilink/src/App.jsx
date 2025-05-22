import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Asegúrate de que esta ruta sea correcta
import Footer from './components/Footer'; // Verifica esta ruta
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PatientDashboard from './pages/paciente/Dashboard';
import ProfessionalDashboard from './pages/profesional/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { AppointmentsProvider } from './context/AppointmentsContext';

function App() {
  return (
    <AuthProvider>
      <AppointmentsProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/paciente/dashboard" element={<PatientDashboard />} />
            <Route
              path="/profesional/dashboard"
              element={<ProfessionalDashboard />}
            />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
          <Footer />
        </Router>
      </AppointmentsProvider>
    </AuthProvider>
  );
}

export default App;