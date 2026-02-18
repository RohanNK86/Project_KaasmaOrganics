import React, { useState } from "react";
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import logo from "../assets1/images/kasmalogo.jpeg";
import { useCart } from "../context/CartContext.jsx";

function Navbar() {
  const { cartCount, setIsCartOpen, isCartOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {!isCartOpen && (
        <div className="banner">
          🌿 Free Shipping on Orders Above ₹299 | 100% Organic Certified Products
        </div>
      )}
      <nav className="navbar" style={{ top: isCartOpen ? '0' : '44px' }}>
        <div className="logo">
          <img src={logo} alt="logo" />
          <span>Kasma Organics</span>
        </div>

        {/* Hamburger toggle for mobile */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <ul className={`nav-links${menuOpen ? ' nav-links--open' : ''}`}>
          <li>
            <a href="#home" onClick={(e) => handleScroll(e, 'home')}>Home</a>
          </li>
          <li>
            <a href="#shop" onClick={(e) => handleScroll(e, 'shop')}>Shop</a>
          </li>
          <li>
            <a href="#about" onClick={(e) => handleScroll(e, 'about')}>About</a>
          </li>
          <li>
            <a href="#benefits" onClick={(e) => handleScroll(e, 'benefits')}>Benefits</a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => handleScroll(e, 'contact')}>Contact</a>
          </li>
        </ul>

        <div className="nav-icons">
          <FiSearch className="nav-icon" />
          <FiUser className="nav-icon" />
          <div
            className="cart-icon-container"
            onClick={() => setIsCartOpen(true)}
            style={{ position: 'relative', cursor: 'pointer' }}
          >
            <FiShoppingCart className="nav-icon" />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
