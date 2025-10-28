"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  useEffect(() => {
    // Counter animation (copy dari JS PHP lo)
    const counters = document.querySelectorAll(".stats-section [data-count]");
    const speed = 200;
    const animateCount = (counter) => {
      const target = +counter.getAttribute("data-count");
      if (counter.innerText === "0") counter.innerText = "0";
      const count = +counter.innerText;
      const inc = target / speed;
      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(() => animateCount(counter), 10);
      } else {
        counter.innerText = target.toLocaleString("id-ID");
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            counter.innerText = "0";
            animateCount(counter);
            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }, []);

  // Link WhatsApp React (ganti PHP urlencode)
  const paket = (nama, harga) =>
    `https://wa.me/628174982969?text=${encodeURIComponent(
      `Halo Narativa, saya tertarik untuk memesan ${nama} dengan harga ${harga}.`
    )}`;

  return (
    <main>
      {/* HERO */}
      <section className="hero-modern d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-lg-6 mb-5 mb-lg-0 text-center text-lg-start" data-aos="fade-right">
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
            <div className="col-lg-6" data-aos="fade-left">
              <div className="hero-image-container position-relative">
                <img src="/assets/images/mk1.png" alt="Mockup Undangan Digital Narativa" className="img-fluid hero-mockup" />
                <div className="floating-element" style={{ position: "absolute", top: "10%", right: "-5%", animation: "float 4s ease-in-out infinite" }}>
                  <div className="bg-white rounded-4 shadow-lg p-3" style={{ backdropFilter: "blur(10px)" }}>
                    <i className="fas fa-heart text-danger fs-3"></i>
                  </div>
                </div>
                <div className="floating-element" style={{ position: "absolute", bottom: "15%", left: "-5%", animation: "float 3s ease-in-out infinite 0.5s" }}>
                  <div className="bg-white rounded-4 shadow-lg p-3">
                    <i className="fas fa-calendar-check text-primary fs-3"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section py-5 bg-white">
        <div className="container">
          <div className="row g-4 text-center">
            {[
              ["1000", "Klien Puas"],
              ["250", "Template Desain"],
              ["98", "Kepuasan (%)"],
              ["24", "Jam Layanan"],
            ].map(([num, label], i) => (
              <div key={i} className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={100 * (i + 1)}>
                <div className="stat-card">
                  <h2 className="display-4 fw-bold text-gradient mb-2" data-count={num}>0</h2>
                  <p className="text-muted mb-0">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-modern py-5">
        <div className="container py-5">
          <div className="row mb-5" data-aos="fade-up">
            <div className="col-lg-6 mx-auto text-center">
              <span className="badge bg-gradient-soft px-3 py-2 rounded-pill mb-3">LAYANAN KAMI</span>
              <h2 className="display-5 fw-bold mb-3">
                Pilihan Layanan <span className="text-gradient">Narativa</span>
              </h2>
              <p className="lead text-muted">Solusi digital terlengkap untuk kebutuhan acara dan bisnis Anda</p>
            </div>
          </div>

          {/* 3 kolom layanan */}
          <div className="row g-4">
            {[
              {
                icon: "fas fa-mobile-alt",
                title: "Undangan Digital",
                text: "Undangan digital elegan dan interaktif untuk semua acara penting Anda. Responsif di semua perangkat.",
                list: ["Desain Modern & Elegan", "Fully Responsive", "Animasi Smooth"],
              },
              {
                icon: "fas fa-list-check",
                title: "Manajemen Tamu & RSVP",
                text: "Fitur RSVP online untuk konfirmasi kehadiran tamu yang praktis dan terorganisir dengan dashboard lengkap.",
                list: ["Real-time RSVP Tracking", "Guest List Management", "Automated Reminders"],
                featured: true,
              },
              {
                icon: "fas fa-store",
                title: "Desain Toko Online",
                text: "Tingkatkan penjualan dengan tampilan katalog Instagram dan E-Commerce yang profesional dan user-friendly.",
                list: ["Modern UI/UX Design", "Product Catalog", "Payment Integration"],
              },
            ].map((s, i) => (
              <div key={i} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={100 * (i + 1)}>
                <div className={`service-card-modern card-modern h-100 ${s.featured ? "featured" : ""}`}>
                  {s.featured && <div className="popular-badge">Populer</div>}
                  <div className="service-icon-modern mb-4"><i className={s.icon}></i></div>
                  <h4 className="fw-bold mb-3">{s.title}</h4>
                  <p className="text-muted mb-4">{s.text}</p>
                  <ul className="list-unstyled text-muted small mb-4">
                    {s.list.map((li, j) => (
                      <li key={j} className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>{li}</li>
                    ))}
                  </ul>
                  <a href="#pricing" className="btn btn-link text-decoration-none p-0 fw-semibold">
                    Pelajari Lebih Lanjut <i className="fas fa-arrow-right ms-2"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SUMMARY */}
      <section className="about-summary-section py-5 bg-white">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="position-relative">
                <img src="/assets/images/lg1.png" alt="Tentang Narativa" className="img-fluid" />
                <div className="shape-square"></div>
                <div className="shape-circle"></div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <span className="badge bg-gradient-soft px-3 py-2 rounded-pill mb-3">TENTANG KAMI</span>
              <h2 className="display-5 fw-bold mb-3">
                Cerita di Balik <span className="text-gradient">Narativa</span>
              </h2>
              <p className="text-muted mb-4">
                Narativa lahir dari ide sederhana: setiap momen spesial layak diceritakan dengan cara yang paling indah. Kami adalah tim desainer dan developer yang bersemangat mengubah ide menjadi undangan digital yang tak terlupakan.
              </p>
              <div className="row g-3 mb-4">
                <div className="col-6"><div className="info-item"><i className="fas fa-award text-primary fs-4"></i><span>5+ Tahun<br />Pengalaman</span></div></div>
                <div className="col-6"><div className="info-item"><i className="fas fa-users text-primary fs-4"></i><span>10+ Tim<br />Profesional</span></div></div>
              </div>
              <Link href="/tentang" className="btn btn-outline-primary btn-lg px-4">
                <i className="fas fa-users me-2"></i>Kenali Kami Lebih Jauh
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
