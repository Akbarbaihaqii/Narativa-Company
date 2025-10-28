'use client'; 

import Link from 'next/link';
import { useEffect } from 'react';

// GAK PERLU IMPORT AOS LAGI

export default function Page() {
  
  // --- Logika untuk Link WhatsApp (dari PHP) ---
  const paket_basic = "Paket Basic";
  const harga_basic = "Rp 150 ribu";
  const pesan_basic = `Halo Narativa, saya tertarik untuk memesan ${paket_basic} dengan harga ${harga_basic}.`;
  const link_wa_basic = `https://wa.me/628174982969?text=${encodeURIComponent(pesan_basic)}`;

  const paket_premium = "Paket Premium";
  const harga_premium = "Rp 300 ribu";
  const pesan_premium = `Halo Narativa, saya tertarik untuk memesan ${paket_premium} dengan harga ${harga_premium}.`;
  const link_wa_premium = `https://wa.me/628174982969?text=${encodeURIComponent(pesan_premium)}`;

  const paket_bisnis = "Paket Bisnis";
  const harga_bisnis = "Rp 500 ribu";
  const pesan_bisnis = `Halo Narativa, saya tertarik untuk memesan ${paket_bisnis} dengan harga ${harga_bisnis}.`;
  const link_wa_bisnis = `https://wa.me/628174982969?text=${encodeURIComponent(pesan_bisnis)}`;

  // --- Logika untuk Animasi Scroll (Pengganti AOS) ---
  useEffect(() => {
    const elementsToAnimate = document.querySelectorAll('.scroll-animate');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Tambah class .is-visible pas elemennya keliatan
          entry.target.classList.add('is-visible');
          // Berhenti ngamatin elemen ini (biar animasi gak ngulang)
          observer.unobserve(entry.target); 
        }
      });
    }, { 
      threshold: 0.1 // Triger pas 10% elemen keliatan
    });

    elementsToAnimate.forEach(el => {
      observer.observe(el);
    });

    // Cleanup observer
    return () => {
      elementsToAnimate.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []); // [] = Cuma jalan sekali pas komponen dimuat


  // --- Logika untuk Counter (Ini udah ada, gak perlu diubah) ---
  useEffect(() => {
    const counters = document.querySelectorAll('.stats-section [data-count]');
    const speed = 200; 

    const animateCount = (counter) => {
      const target = +counter.getAttribute('data-count');
      if (counter.innerText === '0') {
        counter.innerText = '0';
      }
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(() => animateCount(counter), 10); 
      } else {
        counter.innerText = target.toLocaleString('id-ID'); 
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          counter.innerText = '0';
          animateCount(counter);
          observer.unobserve(counter); 
        }
      });
    }, { threshold: 0.5 }); 

    counters.forEach(counter => {
      observer.observe(counter);
    });

    return () => {
      counters.forEach(counter => {
        observer.unobserve(counter);
      });
    };
  }, []); 

  // --- Render Komponen ---
  return (
    <main>
      {/* =================================================
          SECTION 1: HERO
          ================================================= */}
      <section className="hero-modern d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center py-5">
            {/* Ganti data-aos jadi className */}
            <div className="col-lg-6 mb-5 mb-lg-0 text-center text-lg-start scroll-animate fade-right">
              <div className="hero-badge mb-3">
                <span className="badge bg-gradient-soft px-4 py-2 rounded-pill">
                  <i className="fas fa-star me-2"></i>Dipercaya 1000+ Klien
                </span>
              </div>
              <h1 className="display-3 fw-bold mb-4 hero-title">
                Abadikan<br />
                Momen <span className="text-gradient">Spesialmu</span>
              </h1>
              <p className="lead text-muted mb-4 pe-lg-5">
                Narativa hadir dengan layanan desain undangan digital yang modern, elegan, dan memorable untuk membuat acaramu tak terlupakan.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start mb-4">
                <Link href="/galeri" className="btn btn-gradient btn-lg px-4 shadow-lg">
                  <i className="fas fa-images me-2"></i>Lihat Template
                </Link>
                <a href="#pricing" className="btn btn-outline-dark btn-lg px-4">
                  <i className="fas fa-tag me-2"></i>Cek Harga
                </a>
              </div>
            </div>
            {/* Ganti data-aos jadi className */}
            <div className="col-lg-6 scroll-animate fade-left">
              <div className="hero-image-container position-relative">
                <img src="/assets/images/mk1.png" alt="Mockup Undangan Digital Narativa" className="img-fluid hero-mockup" />
                <div className="floating-element" style={{ position: 'absolute', top: '10%', right: '-5%', animation: 'float 4s ease-in-out infinite' }}>
                  <div className="bg-white rounded-4 shadow-lg p-3" style={{ backdropFilter: 'blur(10px)' }}>
                    <i className="fas fa-heart text-danger fs-3"></i>
                  </div>
                </div>
                <div className="floating-element" style={{ position: 'absolute', bottom: '15%', left: '-5%', animation: 'float 3s ease-in-out infinite 0.5s' }}>
                  <div className="bg-white rounded-4 shadow-lg p-3">
                    <i className="fas fa-calendar-check text-primary fs-3"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 2: STATS
          ================================================= */}
      <section className="stats-section py-5 bg-white">
        <div className="container">
          <div className="row g-4 text-center">
            {/* Ganti data-aos jadi className */}
            <div className="col-lg-3 col-md-6 scroll-animate fade-up" data-aos-delay="100">
              <div className="stat-card">
                <h2 className="display-4 fw-bold text-gradient mb-2" data-count="1000">0</h2>
                <p className="text-muted mb-0">Klien Puas</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 scroll-animate fade-up" data-aos-delay="200">
              <div className="stat-card">
                <h2 className="display-4 fw-bold text-gradient mb-2" data-count="250">0</h2>
                <p className="text-muted mb-0">Template Desain</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 scroll-animate fade-up" data-aos-delay="300">
              <div className="stat-card">
                <h2 className="display-4 fw-bold text-gradient mb-2" data-count="98">0</h2>
                <p className="text-muted mb-0">Kepuasan (%)</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 scroll-animate fade-up" data-aos-delay="400">
              <div className="stat-card">
                <h2 className="display-4 fw-bold text-gradient mb-2" data-count="24">0</h2>
                <p className="text-muted mb-0">Jam Layanan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 3: SERVICES
          ================================================= */}
      <section className="services-modern py-5">
        <div className="container py-5">
          <div className="row mb-5 scroll-animate fade-up">
            <div className="col-lg-6 mx-auto text-center">
              <span className="badge bg-gradient-soft px-3 py-2 rounded-pill mb-3">LAYANAN KAMI</span>
              <h2 className="display-5 fw-bold mb-3">Pilihan Layanan <span className="text-gradient">Narativa</span></h2>
              <p className="lead text-muted">Solusi digital terlengkap untuk kebutuhan acara dan bisnis Anda</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6 scroll-animate fade-up" data-aos-delay="100">
              <div className="service-card-modern card-modern h-100">
                <div className="service-icon-modern mb-4">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h4 className="fw-bold mb-3">Undangan Digital</h4>
                <p className="text-muted mb-4">Undangan digital elegan dan interaktif untuk semua acara penting Anda. Responsif di semua perangkat.</p>
                <ul className="list-unstyled text-muted small mb-4">
                  <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>Desain Modern & Elegan</li>
                  <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>Fully Responsive</li>
                  <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>Animasi Smooth</li>
                </ul>
                <a href="#pricing" className="btn btn-link text-decoration-none p-0 fw-semibold">
                  Pelajari Lebih Lanjut <i className="fas fa-arrow-right ms-2"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 scroll-animate fade-up" data-aos-delay="200">
              <div className="service-card-modern card-modern h-100 featured">
                <div className="popular-badge">Populer</div>
                <div className="service-icon-modern mb-4">
                  <i className="fas fa-list-check"></i>
                </div>
                <h4 className="fw-bold mb-3">Manajemen Tamu & RSVP</h4>
                <p className="text-muted mb-4">Fitur RSVP online untuk konfirmasi kehadiran tamu yang praktis dan terorganisir dengan dashboard lengkap.</p>
                <ul className="list-unstyled text-muted small mb-4">
                  <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>Real-time RSVP Tracking</li>
                  <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>Guest List Management</li>
                  <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>Automated Reminders</li>
                </ul>
                <a href="#pricing" className="btn btn-link text-decoration-none p-0 fw-semibold">
                  Pelajari Lebih Lanjut <i className="fas fa-arrow-right ms-2"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 scroll-animate fade-up" data-aos-delay="300">
              <div className="service-card-modern card-modern h-100">
                <div className="service-icon-modern mb-4">
                  <i className="fas fa-store"></i>
                </div>
                <h4 className="fw-bold mb-3">Desain Toko Online</h4>
                <p className="text-muted mb-4">Tingkatkan penjualan dengan tampilan katalog Instagram dan E-Commerce yang profesional dan user-friendly.</p>
                <ul className="list-unstyled text-muted small mb-4">
                  <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>Modern UI/UX Design</li>
                  <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>Product Catalog</li>
                  <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>Payment Integration</li>
                </ul>
                <a href="#pricing" className="btn btn-link text-decoration-none p-0 fw-semibold">
                  Pelajari Lebih Lanjut <i className="fas fa-arrow-right ms-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 4: ABOUT
          ================================================= */}
      <section className="about-summary-section py-5 bg-white">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 scroll-animate fade-right">
              <div className="position-relative">
                <img src="/assets/images/cerita.jpg" alt="Tentang Narativa" className="img-fluid" />
                <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '100px', height: '100px', background: 'var(--gradient-soft)', borderRadius: '30px', zIndex: -1 }}></div>
                <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '150px', height: '150px', background: 'var(--gradient-soft)', borderRadius: '50%', zIndex: -1 }}></div>
              </div>
            </div>
            <div className="col-lg-6 scroll-animate fade-left">
              <span className="badge bg-gradient-soft px-3 py-2 rounded-pill mb-3">TENTANG KAMI</span>
              <h2 className="display-5 fw-bold mb-3">Cerita di Balik <span className="text-gradient">Narativa</span></h2>
              <p className="text-muted mb-4">
                Narativa lahir dari ide sederhana: setiap momen spesial layak diceritakan dengan cara yang paling indah. Kami adalah tim desainer dan developer yang bersemangat mengubah ide menjadi undangan digital yang tak terlupakan.
              </p>
              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0">
                      <div className="bg-gradient-soft rounded-circle p-3">
                        <i className="fas fa-award text-primary fs-4"></i>
                      </div>
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-0 fw-bold">5+ Tahun</h6>
                      <small className="text-muted">Pengalaman</small>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0">
                      <div className="bg-gradient-soft rounded-circle p-3">
                        <i className="fas fa-users text-primary fs-4"></i>
                      </div>
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-0 fw-bold">10+ Tim</h6>
                      <small className="text-muted">Profesional</small>
                    </div>
                  </div>
                </div>
              </div>
              <Link href="/tentang" className="btn btn-outline-primary btn-lg px-4">
                <i className="fas fa-users me-2"></i>Kenali Kami Lebih Jauh
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 5: HOW IT WORKS
          ================================================= */}
      <section className="how-it-works-section py-5">
        <div className="container py-5">
          <div className="row mb-5 scroll-animate fade-up">
            <div className="col-lg-7 mx-auto text-center">
              <span className="badge bg-light px-3 py-2 rounded-pill mb-3" style={{ background: 'var(--gradient-soft) !important', color: 'var(--primary)' }}>PROSES KAMI</span>
              <h2 className="display-5 fw-bold mb-3">Bagaimana Cara Kerjanya?</h2>
              <p className="lead text-muted">Hanya dalam 3 langkah mudah, undangan impianmu siap dibagikan ke seluruh dunia</p>
            </div>
          </div>
          <div className="row g-4 position-relative">
            <div className="col-lg-4 d-flex scroll-animate fade-up" data-aos-delay="100">
              <div className="step-card">
                <div className="position-absolute top-0 start-50 translate-middle">
                  <span className="badge bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px', fontSize: '1.1rem', fontWeight: 700 }}>1</span>
                </div>
                <div className="step-icon">
                  <i className="fas fa-palette"></i>
                </div>
                <div className="step-content">
                  <h4 className="fw-bold mt-4 mb-3">Pilih Desain</h4>
                  <p className="text-muted">Jelajahi katalog template kami yang stylish dan pilih desain yang paling cocok.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 d-flex scroll-animate fade-up" data-aos-delay="200">
              <div className="step-card">
                <div className="position-absolute top-0 start-50 translate-middle">
                  <span className="badge bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px', fontSize: '1.1rem', fontWeight: 700 }}>2</span>
                </div>
                <div className="step-icon">
                  <i className="fas fa-paper-plane"></i>
                </div>
                <div className="step-content">
                  <h4 className="fw-bold mt-4 mb-3">Kirim Materi</h4>
                  <p className="text-muted">Isi form singkat, kirim foto berkualitas, dan ceritakan detail acaramu.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 d-flex scroll-animate fade-up" data-aos-delay="300">
              <div className="step-card">
                <div className="position-absolute top-0 start-50 translate-middle">
                  <span className="badge bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px', fontSize: '1.1rem', fontWeight: 700 }}>3</span>
                </div>
                <div className="step-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="step-content">
                  <h4 className="fw-bold mt-4 mb-3">Terima & Bagikan</h4>
                  <p className="text-muted">Desainmu siap dalam 1-2 hari. Cek, approve, dan langsung siap dibagikan!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 6: PRICING
          ================================================= */}
      <section id="pricing" className="pricing-modern py-5">
        <div className="container py-5">
          <div className="row mb-5 scroll-animate fade-up">
            <div className="col-lg-7 mx-auto text-center">
              <span className="badge bg-gradient-soft px-3 py-2 rounded-pill mb-3">HARGA TERBAIK</span>
              <h2 className="display-5 fw-bold mb-3">Pilihan Harga <span className="text-gradient">Fleksibel</span></h2>
              <p className="lead text-muted">Pilih paket yang paling sesuai dengan kebutuhan dan budget acaramu</p>
            </div>
          </div>
          <div className="row g-4 justify-content-center">
            
            <div className="col-lg-4 col-md-6 scroll-animate fade-up" data-aos-delay="100">
              <div className="pricing-card-modern card-modern h-100 d-flex flex-column">
                <div className="flex-grow-1">
                  <h4 className="fw-bold mb-3 text-center">Paket Basic</h4>
                  <p className="text-muted text-center small">Cocok untuk acara sederhana</p>
                  <div className="price-tag">
                    <span className="currency">Rp</span>
                    <span className="amount">150</span>
                    <span className="period">ribu</span>
                  </div>
                  <ul className="list-unstyled pricing-features text-start mb-4 px-3">
                    <li><i className="fas fa-check-circle text-primary me-2"></i>Desain Undangan Standar</li>
                    <li><i className="fas fa-check-circle text-primary me-2"></i>Foto Galeri (Max 5)</li>
                    <li><i className="fas fa-check-circle text-primary me-2"></i>Peta Lokasi Google Maps</li>
                    <li><i className="fas fa-check-circle text-primary me-2"></i>Musik Background</li>
                    <li className="text-muted opacity-75"><i className="fas fa-times-circle text-danger me-2"></i>Fitur RSVP</li>
                    <li className="text-muted opacity-75"><i className="fas fa-times-circle text-danger me-2"></i>Manajemen Tamu</li>
                  </ul>
                </div>
                <a href={link_wa_basic} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary w-100 btn-lg mt-auto">
                  <i className="fab fa-whatsapp me-2"></i> Pilih Paket Basic
                </a>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 scroll-animate fade-up" data-aos-delay="200">
              <div className="pricing-card-modern card-modern h-100 featured-pricing d-flex flex-column">
                <div className="flex-grow-1">
                  <div className="pricing-badge">PALING POPULER</div>
                  <h4 className="fw-bold mb-3 text-center text-primary">Paket Premium</h4>
                  <p className="text-muted text-center small">Pilihan terbaik untuk acara lengkap</p>
                  <div className="price-tag">
                    <span className="currency">Rp</span>
                    <span className="amount">300</span>
                    <span className="period">ribu</span>
                  </div>
                  <ul className="list-unstyled pricing-features text-start mb-4 px-3">
                    <li><i className="fas fa-check-circle text-primary me-2"></i>Desain Undangan Kustom</li>
                    <li><i className="fas fa-check-circle text-primary me-2"></i>Foto & Video Galeri (Max 20)</li>
                    <li><i className="fas fa-check-circle text-primary me-2"></i>Peta Lokasi & Navigasi</li>
                    <li><i className="fas fa-check-circle text-primary me-2"></i>Fitur RSVP Online</li>
                    <li><i className="fas fa-check-circle text-primary me-2"></i>Manajemen Tamu</li>
                    <li><i className="fas fa-check-circle text-primary me-2"></i>Love Story Timeline</li>
                    <li><i className="fas fa-check-circle text-primary me-2"></i>Revisi 2x</li>
                  </ul>
                </div>
                <a href={link_wa_premium} target="_blank" rel="noopener noreferrer" className="btn btn-gradient w-100 btn-lg mt-auto">
                  <i className="fab fa-whatsapp me-2"></i> Pilih Paket Premium
                </a>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 scroll-animate fade-up" data-aos-delay="300">
              <div className="pricing-card-modern card-modern h-100 d-flex flex-column">
                <div className="flex-grow-1">
                  <h4 className="fw-bold mb-3 text-center">Paket Bisnis</h4>
                  <p className="text-muted text-center small">Untuk kebutuhan acara dan bisnis</p>
                  <div className="price-tag">
                    <span className="currency">Rp</span>
                    <span className="amount">500</span>
                    <span className="period">ribu</span>
                  </div>
                  <ul className="list-unstyled pricing-features text-start mb-4 px-3">
                    <li><i className="fas fa-check-circle text-primary me-2"></i>Semua Fitur Premium</li>
                    <li><i className="fas fa-check-circle text-primary me-2"></i>Desain Toko Online</li>
                    <li><i className="fas fa-check-circle text-primary me-2"></i>Katalog Produk Interaktif</li>
                    <li><i className="fas fa-check-circle text-primary me-2"></i>Integrasi Media Sosial</li>
                    <li><i className="fas fa-check-circle text-primary me-2"></i>Analytics Dashboard</li>
                    <li><i className="fas fa-check-circle text-primary me-2"></i>Dukungan Prioritas 24/7</li>
                    <li><i className="fas fa-check-circle text-primary me-2"></i>Revisi Unlimited</li>
                  </ul>
                </div>
                <a href={link_wa_bisnis} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary w-100 btn-lg mt-auto">
                  <i className="fab fa-whatsapp me-2"></i> Pilih Paket Bisnis
                </a>
              </div>
            </div>
          </div>
          
          <div className="row mt-5 pt-4 scroll-animate fade-up">
            <div className="col-lg-8 mx-auto">
              <div className="card-modern text-center bg-gradient-soft border-primary">
                <h5 className="fw-bold mb-3"><i className="fas fa-tags me-2 text-primary"></i> Promo Spesial Bulan Ini!</h5>
                <p className="text-muted mb-3">Dapatkan diskon <strong className="text-primary">20%</strong> untuk pemesanan paket Premium atau Bisnis. Sebutkan kode promo <span className="badge bg-primary text-white px-3 py-2">NARATIVA20</span> saat chat via WhatsApp!</p>
                <small className="text-muted">*Syarat dan ketentuan berlaku.</small>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =================================================
          SECTION 7: FAQ
          ================================================= */}
      <section className="faq-section py-5 bg-white">
        <div className="container py-5">
          <div className="row mb-5 scroll-animate fade-up">
            <div className="col-lg-6 mx-auto text-center">
              <span className="badge bg-gradient-soft px-3 py-2 rounded-pill mb-3">FAQ</span>
              <h2 className="display-5 fw-bold mb-3">Pertanyaan <span className="text-gradient">Umum</span></h2>
              <p className="lead text-muted">Temukan jawaban dari pertanyaan yang sering diajukan</p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion accordion-flush scroll-animate fade-up" id="faqAccordion">
                <div className="accordion-item border-0 mb-3 shadow-sm rounded-4 overflow-hidden">
                  <h2 className="accordion-header">
                    <button className="accordion-button rounded-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                      <i className="fas fa-question-circle text-primary me-3"></i>
                      Berapa lama proses pembuatan undangan?
                    </button>
                  </h2>
                  <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-muted">
                      Proses pembuatan standar 1-2 hari kerja setelah semua materi lengkap. Tersedia opsi pengerjaan kilat 24 jam dengan biaya tambahan.
                    </div>
                  </div>
                </div>
                <div className="accordion-item border-0 mb-3 shadow-sm rounded-4 overflow-hidden">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed rounded-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                      <i className="fas fa-question-circle text-primary me-3"></i>
                      Apakah bisa request desain custom?
                    </button>
                  </h2>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-muted">
                      Ya! Paket Premium dan Bisnis memungkinkan Anda request desain custom. Tim kami siap membantu mewujudkan konsep unik Anda.
                    </div>
                  </div>
                </div>
                {/* ... (sisa accordion item) ... */}
                <div className="accordion-item border-0 mb-3 shadow-sm rounded-4 overflow-hidden">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed rounded-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                      <i className="fas fa-question-circle text-primary me-3"></i>
                      Bagaimana cara pembayarannya?
                    </button>
                  </h2>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-muted">
                      Kami menerima transfer bank (BCA, Mandiri, BNI), e-wallet (OVO, GoPay, Dana), dan QRIS. DP 50% di awal, pelunasan sebelum finalisasi.
                    </div>
                  </div>
                </div>
                <div className="accordion-item border-0 mb-3 shadow-sm rounded-4 overflow-hidden">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed rounded-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                      <i className="fas fa-question-circle text-primary me-3"></i>
                      Apakah ada garansi revisi?
                    </button>
                  </h2>
                  <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-muted">
                      Tentu! Basic (1x revisi minor), Premium (2x revisi minor), Bisnis (revisi minor unlimited). Revisi meliputi teks, warna, dan layout minor.
                    </div>
                  </div>
                </div>
                <div className="accordion-item border-0 mb-3 shadow-sm rounded-4 overflow-hidden">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed rounded-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
                      <i className="fas fa-question-circle text-primary me-3"></i>
                      Berapa lama undangan aktif?
                    </button>
                  </h2>
                  <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-muted">
                      Undangan aktif minimal 3 bulan setelah tanggal acara. Opsi perpanjangan tersedia dengan biaya maintenance terjangkau.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 8: CTA
          ================================================= */}
      <section className="cta-modern py-5">
        <div className="container py-5">
          <div className="row align-items-center justify-content-between scroll-animate fade-up">
            <div className="col-lg-7 text-center text-lg-start mb-4 mb-lg-0">
              <h2 className="display-5 fw-bold text-white mb-3">Siap Membuat Undangan Impianmu?</h2>
              <p className="lead text-white" style={{ opacity: 0.9 }}>Hubungi kami sekarang dan dapatkan konsultasi gratis untuk proyek undangan digital Anda!</p>
              <div className="d-flex flex-wrap gap-3 mt-4 justify-content-center justify-content-lg-start text-white">
                <div className="d-flex align-items-center"><i className="fas fa-check-circle me-2"></i>Konsultasi Gratis</div>
                <div className="d-flex align-items-center"><i className="fas fa-check-circle me-2"></i>Respon Cepat</div>
                <div className="d-flex align-items-center"><i className="fas fa-check-circle me-2"></i>Revisi Fleksibel</div>
              </div>
            </div>
            <div className="col-lg-auto text-center">
              <a href="https://wa.me/628174982969?text=Halo%20Narativa,%20saya%20tertarik%20untuk%20membuat%20undangan%20digital." target="_blank" rel="noopener noreferrer" className="btn btn-light btn-lg px-5 py-3 rounded-pill shadow-lg text-primary fw-bold">
                <i className="fab fa-whatsapp me-2 fs-5"></i>Hubungi Kami Sekarang
              </a>
              <p className="text-white mt-3 mb-0 small" style={{ opacity: 0.8 }}>
                <i className="fas fa-headset me-2"></i>Respon cepat dalam hitungan menit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 9: PARTNERS
          ================================================= */}
      <section className="partners-section py-5 bg-white">
        <div className="container py-4">
          <div className="row scroll-animate fade-up">
            <div className="col-12 text-center mb-4">
              <p className="text-muted fw-semibold mb-4">Dipercaya oleh berbagai klien</p>
              <div className="d-flex flex-wrap justify-content-center align-items-center gap-5 opacity-50">
                <div className="text-center"><i className="fas fa-hotel fs-2"></i><p className="small mb-0 mt-2">Hotel</p></div>
                <div className="text-center"><i className="fas fa-ring fs-2"></i><p className="small mb-0 mt-2">WO</p></div>
                <div className="text-center"><i className="fas fa-building fs-2"></i><p className="small mb-0 mt-2">Corporate</p></div>
                <div className="text-center"><i className="fas fa-shopping-bag fs-2"></i><p className="small mb-0 mt-2">E-Commerce</p></div>
                <div className="text-center"><i className="fas fa-graduation-cap fs-2"></i><p className="small mb-0 mt-2">Pendidikan</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 10: WA FLOATING BUTTON
          ================================================= */}
      <a
        href="https://wa.me/628174982969?text=Halo%20Narativa,%20saya%20tertarik%20dengan%20layanan%20undangan%20digital."
        className="wa-floating-button" 
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </main>
  );
}