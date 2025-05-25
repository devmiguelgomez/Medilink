import React from 'react';

function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer
      className="footer"
      style={{
        background: 'var(--primary)',
        color: '#fff',
        padding: '1.5rem 1rem', // Reducido el padding
        borderTopLeftRadius: '1rem', // Reducido el radio
        borderTopRightRadius: '1rem',
        boxShadow: '0 -4px 16px rgba(44, 78, 207, 0.08)',
        marginTop: '2rem',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      <div className="footer-content">
        <div className="footer-logo">
          <h3 style={{ 
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 600,
            fontSize: '1rem',
            margin: '0 0 0.5rem 0',
            letterSpacing: 0.5
          }}>
            MedLink
          </h3>
          <p>Plataforma de gestión médica</p>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h4>Enlaces</h4>
            <ul>
              <li><a href="/">Inicio</a></li>
              <li><a href="/about">Sobre nosotros</a></li>
              <li><a href="/services">Servicios</a></li>
              <li><a href="/contact">Contacto</a></li>
            </ul>
          </div>
          
          <div className="link-group">
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacy">Política de privacidad</a></li>
              <li><a href="/terms">Términos de uso</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="copyright">
        <p>&copy; {year} MedLink. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;