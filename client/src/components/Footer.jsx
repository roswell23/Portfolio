import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <span className="nav-crown">👑</span>
          <span className="nav-brand-text">RC Portfolio</span>
        </div>

        {/* Copyright */}
        <p className="footer-copy">
          © {currentYear} <strong>Roswell Cruz</strong>. All rights reserved. Built with PERN Stack.
        </p>
      </div>
    </footer>
  );
}

