// src/components/Footer.jsx

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-2">
          © 2025 Магазин "Арсенал" — всё для настоящих ценителей оружия.
        </p>
        <div className="d-flex justify-content-center gap-4 fs-5">
          <a
            href="https://t.me/arsenalshop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light"
          >
            <i className="bi bi-telegram"></i>
          </a>
            <a
            href="https://vk.com/arsenalshop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light"
            >
            <i className="fab fa-vk"></i>
            </a>

          <a
            href="https://youtube.com/@arsenalshop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light"
          >
            <i className="bi bi-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
