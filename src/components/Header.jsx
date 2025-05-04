import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from './Cart';

const Header = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">👟</span>
            <span className="logo-text">SneakerShop</span>
          </Link>
          
          <div className="header-actions">
            <div 
              className="cart-icon" 
              onClick={() => setCartOpen(!cartOpen)}
              aria-label="Shopping cart"
            >
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7A2,2 0 0,1 5,15C5,14.18 5.59,13.5 6.36,13.31L8.1,10L5.4,5H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
    </header>
  );
};

export default Header;