import React from 'react';

function Footer() {
  return (
    <footer
      className="footer"
      style={{
        background: 'linear-gradient(90deg, #007bff 60%, #00c6fb 100%)',
        color: '#fff',
        padding: '2rem 1rem 1rem 1rem',
        borderTopLeftRadius: '2rem',
        borderTopRightRadius: '2rem',
        boxShadow: '0 -4px 16px rgba(0,123,255,0.10)',
        marginTop: '3rem',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
        alt="MedLink Logo"
        style={{
          width: 48,
          marginBottom: 8,
          filter: 'drop-shadow(0 2px 8px #00c6fb88)'
        }}
      />
      <h3 style={{ fontWeight: 700, margin: '0 0 0.5rem 0', letterSpacing: 1 }}>
        MedLink - Conectando Salud y Tecnología
      </h3>
      <p style={{ margin: 0, fontSize: '1rem', opacity: 0.95 }}>
        &copy; {new Date().getFullYear()} MedLink. Todos los derechos reservados.
      </p>
      <div style={{ marginTop: 12, fontSize: '0.95rem' }}>
        <a
          href="mailto:contacto@medlink.com"
          style={{
            color: '#fff',
            margin: '0 1rem',
            textDecoration: 'underline',
            fontWeight: 500
          }}
        >
          contacto@medlink.com
        </a>
        <span style={{ color: '#dc3545', fontWeight: 700 }}>|</span>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#fff',
            margin: '0 1rem',
            textDecoration: 'underline',
            fontWeight: 500
          }}
        >
          Instagram
        </a>
        <span style={{ color: '#dc3545', fontWeight: 700 }}>|</span>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#fff',
            margin: '0 1rem',
            textDecoration: 'underline',
            fontWeight: 500
          }}
        >
          Facebook
        </a>
      </div>
    </footer>
  );
}

export default Footer;