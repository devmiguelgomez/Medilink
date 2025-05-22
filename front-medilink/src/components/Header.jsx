import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header
      className="header"
      style={{
        background: 'linear-gradient(90deg, #007bff 60%, #00c6fb 100%)',
        color: '#fff',
        padding: '1.2rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomLeftRadius: '1.5rem',
        borderBottomRightRadius: '1.5rem',
        boxShadow: '0 4px 16px rgba(0,123,255,0.10)',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
          alt="MedLink Logo"
          style={{
            width: 44,
            marginRight: 10,
            filter: 'drop-shadow(0 2px 8px #00c6fb88)'
          }}
        />
        <span style={{
          fontWeight: 700,
          fontSize: '1.5rem',
          letterSpacing: 1,
          textShadow: '0 2px 8px #00c6fb33'
        }}>
          Med<span style={{ color: '#dc3545' }}>Link</span>
        </span>
        <span style={{
          background: '#fff',
          color: '#007bff',
          fontWeight: 600,
          borderRadius: '1rem',
          padding: '0.2rem 0.8rem',
          fontSize: '0.95rem',
          marginLeft: 10,
          boxShadow: '0 2px 8px #00c6fb22'
        }}>
          Plataforma Médica
        </span>
      </div>
      <nav style={{ display: 'flex', gap: '1.2rem' }}>
        <Link
          to="/"
          style={{
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.05rem',
            padding: '0.4rem 1.1rem',
            borderRadius: '1.2rem',
            transition: 'background 0.2s',
            background: 'transparent'
          }}
          onMouseOver={e => e.target.style.background = '#e3f0ff44'}
          onMouseOut={e => e.target.style.background = 'transparent'}
        >
          Inicio
        </Link>
        <Link
          to="/login"
          style={{
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.05rem',
            padding: '0.4rem 1.1rem',
            borderRadius: '1.2rem',
            transition: 'background 0.2s',
            background: 'transparent'
          }}
          onMouseOver={e => e.target.style.background = '#e3f0ff44'}
          onMouseOut={e => e.target.style.background = 'transparent'}
        >
          Iniciar Sesión
        </Link>
        <Link
          to="/register"
          style={{
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.05rem',
            padding: '0.4rem 1.1rem',
            borderRadius: '1.2rem',
            background: '#dc3545',
            boxShadow: '0 2px 8px #dc354522',
            transition: 'background 0.2s'
          }}
          onMouseOver={e => e.target.style.background = '#b71c2b'}
          onMouseOut={e => e.target.style.background = '#dc3545'}
        >
          Registrarse
        </Link>
      </nav>
    </header>
  );
}

export default Header;