"use client";
import { useEffect } from "react";
import Link from "next/link"; // Import Link untuk navigasi
import {
  FaStar, FaHeart, FaPalette, FaCode, FaBookOpen, FaLightbulb,
  FaBullseye, FaEye, FaRocket, FaCheckCircle, FaGem, FaUsers,
  FaShieldAlt, FaQuestionCircle, FaBolt, FaPaintBrush, FaTags,
  FaHeadset, FaSyncAlt, FaMobileAlt, FaComments, FaWhatsapp,
  FaImages, FaClock
} from "react-icons/fa"; // Import semua ikon yang dibutuhkan

// HAPUS 'import "./Tentang.css";' DARI SINI
// KARENA SEMUA STYLE SUDAH ADA DI FILE CSS GLOBAL ANDA

export default function TentangPage() {
  
  // Scroll Animation Observer
  useEffect(() => {
    const elementsToAnimate = document.querySelectorAll('.scroll-animate');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    elementsToAnimate.forEach(el => observer.observe(el));
    
    return () => {
      elementsToAnimate.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          {/* Class "min-vh-100" dari JSX Anda sebelumnya ada di sini, 
             sesuai dengan style .about-hero di CSS Anda */}
          <div className="row align-items-center min-vh-100 py-5">
            <div className="col-lg-6 scroll-animate fade-right">
              <div className="about-hero-badge mb-3">
                <span className="badge bg-gradient-soft px-4 py-2 rounded-pill">
                  <FaStar className="me-2" />Tentang Kami
                </span>
              </div>
              <h1 className="display-3 fw-bold mb-4 text-white">
                Cerita di Balik<br />
                <span className="text-gradient-light">Narativa</span>
              </h1>
              <p className="lead text-white mb-4" style={{ opacity: 0.95 }}>
                Memulai dari mimpi sederhana untuk membuat setiap momen spesial menjadi tak terlupakan melalui undangan digital yang elegan dan modern.
              </p>
              <div className="d-flex flex-wrap gap-3 mb-4">
                <div className="stat-box">
                  <h3 className="text-white fw-bold mb-0">5+</h3>
                  <small className="text-white" style={{ opacity: 0.85 }}>Tahun Pengalaman</small>
                </div>
                <div className="stat-box">
                  <h3 className="text-white fw-bold mb-0">1000+</h3>
                  <small className="text-white" style={{ opacity: 0.85 }}>Klien Puas</small>
                </div>
                <div className="stat-box">
                  <h3 className="text-white fw-bold mb-0">98%</h3>
                  <small className="text-white" style={{ opacity: 0.85 }}>Kepuasan</small>
                </div>
              </div>
            </div>
            <div className="col-lg-6 scroll-animate fade-left">
              <div className="about-hero-image">
                <img src="/assets/images/mk1.png" alt="Narativa Team" className="img-fluid" />
                <div className="floating-badge badge-1">
                  <FaHeart className="text-danger" />
                </div>
                <div className="floating-badge badge-2">
                  <FaPalette className="text-primary" />
                </div>
                <div className="floating-badge badge-3">
                  <FaCode className="text-success" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story py-5 bg-white">
        <div className="container py-5">
          <div className="row align-items-center g-5 mb-5">
            <div className="col-lg-6 scroll-animate fade-right">
              <div className="story-image-wrapper">
                <img src="/assets/images/cerita.jpg" alt="Narativa Story" className="img-fluid rounded-4 shadow-lg" />
                <div className="story-decoration decoration-1"></div>
                <div className="story-decoration decoration-2"></div>
              </div>
            </div>
            <div className="col-lg-6 scroll-animate fade-left">
              <span className="badge bg-gradient-soft px-3 py-2 rounded-pill mb-3">
                <FaBookOpen className="me-2" />KISAH KAMI
              </span>
              <h2 className="display-5 fw-bold mb-4">
                Awal Mula <span className="text-gradient">Narativa</span>
              </h2>
              <p className="text-muted mb-3 fs-5">
                Narativa lahir dari ide sederhana: <strong>setiap momen spesial layak untuk diceritakan dengan cara yang paling indah dan personal.</strong>
              </p>
              <p className="text-muted mb-4">
                Dimulai pada tahun 2019, kami memulai perjalanan dengan visi untuk mengubah cara orang berbagi kebahagiaan mereka. Dari sebuah ruangan kecil dengan laptop dan secangkir kopi, kami mulai merancang undangan digital pertama kami.
              </p>
              <p className="text-muted mb-4">
                Hari ini, Narativa telah berkembang menjadi tim yang terdiri dari desainer, developer, dan content creator berbakat yang bersatu dengan satu tujuan: menciptakan pengalaman digital yang tak terlupakan untuk setiap klien kami.
              </p>
              <div className="d-flex align-items-center gap-3">
                <div className="about-icon-box">
                  <FaLightbulb />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Inovasi Tanpa Henti</h6>
                  <p className="text-muted small mb-0">Selalu menghadirkan ide fresh dan modern</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision py-5">
        <div className="container py-5">
          <div className="row mb-5 scroll-animate fade-up">
            <div className="col-lg-8 mx-auto text-center">
              <span className="badge bg-light px-3 py-2 rounded-pill mb-3">
                <FaBullseye className="me-2" />VISI & MISI
              </span>
              <h2 className="display-5 fw-bold mb-3">Yang Kami Perjuangkan</h2>
              <p className="lead text-muted">Nilai-nilai yang menjadi pondasi setiap karya kami</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-6 scroll-animate fade-up">
              <div className="mission-card">
                <div className="mission-icon">
                  <FaEye />
                </div>
                <h3 className="fw-bold mb-3">Visi Kami</h3>
                <p className="text-muted mb-4">
                  Menjadi platform undangan digital nomor 1 di Indonesia yang dipercaya untuk mengabadikan setiap momen berharga dengan desain yang menakjubkan dan teknologi terkini.
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2"><FaCheckCircle className="text-primary me-2" />Inovasi berkelanjutan</li>
                  <li className="mb-2"><FaCheckCircle className="text-primary me-2" />Kualitas terbaik</li>
                  <li className="mb-2"><FaCheckCircle className="text-primary me-2" />Kepuasan pelanggan</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 scroll-animate fade-up" data-aos-delay="100">
              <div className="mission-card">
                <div className="mission-icon">
                  <FaRocket />
                </div>
                <h3 className="fw-bold mb-3">Misi Kami</h3>
                <p className="text-muted mb-4">
                  Memberikan solusi undangan digital yang mudah, terjangkau, dan berkualitas tinggi untuk semua kalangan, dengan layanan yang ramah dan responsif.
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2"><FaCheckCircle className="text-primary me-2" />Desain modern & elegan</li>
                  <li className="mb-2"><FaCheckCircle className="text-primary me-2" />Harga terjangkau</li>
                  <li className="mb-2"><FaCheckCircle className="text-primary me-2" />Pelayanan maksimal</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="our-values py-5 bg-white">
        <div className="container py-5">
          <div className="row mb-5 scroll-animate fade-up">
            <div className="col-lg-8 mx-auto text-center">
              <span className="badge bg-gradient-soft px-3 py-2 rounded-pill mb-3">
                <FaGem className="me-2" />NILAI KAMI
              </span>
              <h2 className="display-5 fw-bold mb-3">Prinsip yang Kami Pegang</h2>
              <p className="lead text-muted">Nilai-nilai inti yang membentuk budaya kerja kami</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6 scroll-animate fade-up">
              <div className="value-card">
                <div className="value-icon">
                  <FaHeart />
                </div>
                <h5 className="fw-bold mt-3 mb-2">Passion</h5>
                <p className="text-muted small mb-0">Cinta dan dedikasi dalam setiap karya yang kami ciptakan</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 scroll-animate fade-up" data-aos-delay="100">
              <div className="value-card">
                <div className="value-icon">
                  <FaUsers />
                </div>
                <h5 className="fw-bold mt-3 mb-2">Collaboration</h5>
                <p className="text-muted small mb-0">Bekerja sama dengan klien untuk hasil terbaik</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 scroll-animate fade-up" data-aos-delay="200">
              <div className="value-card">
                <div className="value-icon">
                  <FaShieldAlt />
                </div>
                <h5 className="fw-bold mt-3 mb-2">Integrity</h5>
                <p className="text-muted small mb-0">Jujur dan transparan dalam setiap langkah</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 scroll-animate fade-up" data-aos-delay="300">
              <div className="value-card">
                <div className="value-icon">
                  <FaStar />
                </div>
                <h5 className="fw-bold mt-3 mb-2">Excellence</h5>
                <p className="text-muted small mb-0">Standar kualitas tinggi di setiap detail</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us py-5">
        <div className="container py-5">
          <div className="row mb-5 scroll-animate fade-up">
            <div className="col-lg-8 mx-auto text-center">
              <span className="badge bg-light px-3 py-2 rounded-pill mb-3">
                <FaQuestionCircle className="me-2" />KEUNGGULAN
              </span>
              <h2 className="display-5 fw-bold mb-3">Kenapa Memilih Narativa?</h2>
              <p className="lead text-muted">Alasan mengapa kami menjadi pilihan terpercaya</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6 scroll-animate fade-up">
              <div className="feature-card h-100">
                <div className="feature-number">01</div>
                <div className="feature-icon mb-3">
                  <FaBolt />
                </div>
                <h5 className="fw-bold mb-3">Proses Cepat</h5>
                <p className="text-muted mb-0">Undangan jadi dalam 1-2 hari kerja dengan kualitas premium tanpa kompromi</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 scroll-animate fade-up" data-aos-delay="100">
              <div className="feature-card h-100">
                <div className="feature-number">02</div>
                <div className="feature-icon mb-3">
                  <FaPaintBrush />
                </div>
                <h5 className="fw-bold mb-3">Desain Eksklusif</h5>
                <p className="text-muted mb-0">Template modern dan custom design yang disesuaikan dengan tema acara Anda</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 scroll-animate fade-up" data-aos-delay="200">
              <div className="feature-card h-100">
                <div className="feature-number">03</div>
                <div className="feature-icon mb-3">
                  <FaTags />
                </div>
                <h5 className="fw-bold mb-3">Harga Terjangkau</h5>
                <p className="text-muted mb-0">Paket harga fleksibel mulai dari 150rb dengan value yang maksimal</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 scroll-animate fade-up" data-aos-delay="300">
              <div className="feature-card h-100">
                <div className="feature-number">04</div>
                <div className="feature-icon mb-3">
                  <FaHeadset />
                </div>
                <h5 className="fw-bold mb-3">Support 24/7</h5>
                <p className="text-muted mb-0">Tim kami siap membantu kapan saja via WhatsApp, email, atau telepon</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 scroll-animate fade-up" data-aos-delay="400">
              <div className="feature-card h-100">
                <div className="feature-number">05</div>
                <div className="feature-icon mb-3">
                  <FaSyncAlt />
                </div>
                <h5 className="fw-bold mb-3">Revisi Gratis</h5>
                <p className="text-muted mb-0">Garansi revisi sesuai paket hingga Anda 100% puas dengan hasilnya</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 scroll-animate fade-up" data-aos-delay="500">
              <div className="feature-card h-100">
                <div className="feature-number">06</div>
                <div className="feature-icon mb-3">
                  <FaMobileAlt />
                </div>
                <h5 className="fw-bold mb-3">Fully Responsive</h5>
                <p className="text-muted mb-0">Tampil sempurna di semua device: mobile, tablet, hingga desktop</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta py-5">
        <div className="container py-5">
          <div className="row justify-content-center scroll-animate fade-up">
            <div className="col-lg-10">
              <div className="cta-card text-center">
                <div className="cta-icon mb-4">
                  <FaComments />
                </div>
                <h2 className="display-5 fw-bold text-white mb-4">
                  Mari Ciptakan Undangan<br />Impianmu Bersama Kami!
                </h2>
                <p className="lead text-white mb-4" style={{ opacity: 0.95 }}>
                  Konsultasi gratis untuk membahas konsep dan kebutuhan undangan digitalmu
                </p>
                <div className="d-flex flex-wrap gap-3 justify-content-center">
                  <a 
                    href="https://wa.me/628174982969?text=Halo%20Narativa,%20saya%20tertarik%20untuk%20konsultasi%20tentang%20undangan%20digital" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-light btn-lg px-5 py-3 rounded-pill shadow-lg"
                  >
                    <FaWhatsapp className="me-2 fs-5" />
                    Hubungi Kami Sekarang
                  </a>
                  <Link 
                    href="/galeri"
                    className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill"
                  >
                    <FaImages className="me-2" />
                    Lihat Portfolio
                  </Link>
                </div>
                <p className="text-white mt-4 mb-0 small" style={{ opacity: 0.8 }}>
                  <FaClock className="me-2" />Respon cepat dalam hitungan menit
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}