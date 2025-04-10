import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-bottom">
          <div className="copyright">
            © {new Date().getFullYear()} SneakerShop. Все права защищены.
          </div>
          <div className="legal-links">
            <Link to="/privacy" className="legal-link">Политика конфиденциальности</Link>
            <Link to="/terms" className="legal-link">Условия использования</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;