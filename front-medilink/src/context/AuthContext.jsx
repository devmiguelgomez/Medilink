import React, { createContext, useState, useEffect, useContext } from 'react';
import { initializeAuth, getCurrentUser, isAuthenticated } from '../services/authService';

// Crear el contexto con valores predeterminados
const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  loading: true
});

// Hook personalizado para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Inicializar la autenticación
    initializeAuth();
    
    // Verificar si hay un usuario autenticado
    const user = getCurrentUser();
    const authenticated = isAuthenticated();
    
    setCurrentUser(user);
    setIsLoggedIn(authenticated);
    setLoading(false);
  }, []);

  // Valor para proveer al contexto
  const value = {
    currentUser,
    setCurrentUser,
    isLoggedIn,
    setIsLoggedIn,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;