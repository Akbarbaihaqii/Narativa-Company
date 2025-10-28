import React from 'react';
// Import ikon-ikon yang Anda minta
import { FaInstagram, FaTiktok, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

// HAPUS 'import ./Footer.css;' DARI SINI JIKA MASIH ADA

export default function Footer() {
  return (
    // Menggunakan className "footer-modern" dari file CSS Anda
    <footer className="footer-modern pt-5 pb-4">
      <div className="container text-center">
        
        {/* === Brand Info === */}
        <div className="footer-brand mb-4">
          <h3 className="h2 mb-2" style={{ color: '#fff', fontWeight: 700 }}>
            Narativa
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1rem' }}>
            Digital Invitations & Creative Design • Indonesia
          </p>
        </div>

        {/* === Social Media Icons === */}
        {/* Menggunakan className "social-links" dan "social-link" */}
        <div className="social-links d-flex justify-content-center mb-4">
          
          <a 
            href="https://www.instagram.com/narativaofficial.id?igsh=dWd2ZzFreWZlOG92" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link"
            aria-label="Instagram Narativa"
          >
            <FaInstagram />
          </a>
          
          {/* Ikon TikTok */}
          <a 
            href="https://www.tiktok.com/@narativa.official?_t=ZS-90jO9ssoyii&_r=1" // GANTI DENGAN LINK TIKTOK ANDA
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link"
            aria-label="TikTok Narativa"
          >
            <FaTiktok />
          </a>

          <a 
            href="https://wa.me/628174982969" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link"
            aria-label="WhatsApp Narativa"
          >
            <FaWhatsapp />
          </a>

          <a 
            href="mailto:officials.narativa@gmail.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link"
            aria-label="Email Narativa"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* === Copyright === */}
        {/* Menggunakan className "footer-bottom" */}
        <div className="footer-bottom pt-3" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}>
          <small style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            © {new Date().getFullYear()} Narativa. All rights reserved.
          </small>
        </div>

      </div>
    </footer>
  );
}