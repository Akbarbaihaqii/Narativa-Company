"use client";
import { useState, useEffect } from "react";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll Animation
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Nama depan wajib diisi';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subjek wajib diisi';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Pesan wajib diisi';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Pesan minimal 10 karakter';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulasi pengiriman - Ganti dengan API call yang sebenarnya
    setTimeout(() => {
      // Redirect ke WhatsApp dengan pesan yang sudah diformat
      const message = `*Pesan dari Website Narativa*\n\n` +
        `Nama: ${formData.firstName} ${formData.lastName}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n` +
        `Subjek: ${formData.subject}\n\n` +
        `Pesan:\n${formData.message}`;
      
      const whatsappUrl = `https://wa.me/628174982969?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <main className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="row align-items-center min-vh-100 py-5">
            <div className="col-lg-6 scroll-animate fade-right">
              <div className="contact-hero-content">
                <span className="badge bg-gradient-soft px-4 py-2 rounded-pill mb-3">
                  <i className="fas fa-envelope me-2"></i>Hubungi Kami
                </span>
                <h1 className="display-3 fw-bold mb-4 text-white">
                  Mari Wujudkan<br />
                  <span className="text-gradient-light">Undangan Impianmu</span>
                </h1>
                <p className="lead text-white mb-4" style={{ opacity: 0.95 }}>
                  Tim kami siap membantu mewujudkan undangan digital yang sempurna untuk acara spesialmu. Hubungi kami sekarang!
                </p>
                <div className="contact-stats">
                  <div className="stat-item">
                    <i className="fas fa-clock"></i>
                    <div>
                      <h5>Respon Cepat</h5>
                      <p>Dalam hitungan menit</p>
                    </div>
                  </div>
                  <div className="stat-item">
                    <i className="fas fa-headset"></i>
                    <div>
                      <h5>Support 24/7</h5>
                      <p>Siap membantu kapan saja</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 scroll-animate fade-left">
              <div className="contact-hero-image">
                <div className="floating-icon icon-1">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="floating-icon icon-2">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <div className="floating-icon icon-3">
                  <i className="fas fa-phone-alt"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="contact-content py-5">
        <div className="container py-5">
          <div className="row g-4">
            {/* Contact Form */}
            <div className="col-lg-7 scroll-animate fade-up">
              <div className="contact-form-card">
                <div className="form-header">
                  <div className="form-icon">
                    <i className="fas fa-paper-plane"></i>
                  </div>
                  <h2 className="fw-bold mb-2">Kirim Pesan</h2>
                  <p className="text-muted">Isi form di bawah ini dan kami akan segera menghubungi Anda</p>
                </div>

                <form onSubmit={handleSubmit} className="contact-form" noValidate>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-group">
                        <label className="form-label">
                          <i className="fas fa-user me-2"></i>Nama Depan *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                          placeholder="Masukkan nama depan"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                        {errors.firstName && (
                          <div className="invalid-feedback">{errors.firstName}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-group">
                        <label className="form-label">
                          <i className="fas fa-user me-2"></i>Nama Belakang
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          className="form-control"
                          placeholder="Masukkan nama belakang"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-group">
                        <label className="form-label">
                          <i className="fas fa-envelope me-2"></i>Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          placeholder="nama@email.com"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-group">
                        <label className="form-label">
                          <i className="fas fa-phone me-2"></i>No. Telepon
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          className="form-control"
                          placeholder="+62 xxx xxxx xxxx"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="form-group">
                      <label className="form-label">
                        <i className="fas fa-tag me-2"></i>Subjek *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                        placeholder="Tentang apa pesan Anda?"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                      {errors.subject && (
                        <div className="invalid-feedback">{errors.subject}</div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="form-group">
                      <label className="form-label">
                        <i className="fas fa-comment-alt me-2"></i>Pesan Anda *
                      </label>
                      <textarea
                        name="message"
                        rows="6"
                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                        placeholder="Ceritakan kebutuhan undangan digital Anda..."
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                      {errors.message && (
                        <div className="invalid-feedback">{errors.message}</div>
                      )}
                      <small className="form-text text-muted">
                        Minimal 10 karakter
                      </small>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-gradient btn-lg w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>
                        Kirim Pesan via WhatsApp
                      </>
                    )}
                  </button>

                  <p className="text-center text-muted mt-3 mb-0 small">
                    <i className="fas fa-lock me-1"></i>
                    Informasi Anda aman dan tidak akan dibagikan
                  </p>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-5 scroll-animate fade-up" data-aos-delay="100">
              <div className="contact-info-wrapper">
                {/* Contact Cards */}
                <div className="contact-info-card">
                  <div className="info-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="info-content">
                    <h5 className="fw-bold mb-2">Alamat Kami</h5>
                    <p className="text-muted mb-0">
                      Jl. Pramuka Gg. Ikhlas No.17<br />
                      Bandar Lampung, Lampung<br />
                      Indonesia
                    </p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="info-icon whatsapp">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <div className="info-content">
                    <h5 className="fw-bold mb-2">WhatsApp</h5>
                    <a 
                      href="https://wa.me/628174982969" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      +62 817-4982-969
                    </a>
                    <p className="text-muted small mb-0 mt-1">
                      <i className="fas fa-clock me-1"></i>
                      Respon cepat 24/7
                    </p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="info-icon email">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="info-content">
                    <h5 className="fw-bold mb-2">Email</h5>
                    <a 
                      href="mailto:officials.narativa@gmail.com"
                      className="contact-link"
                    >
                      officials.narativa@gmail.com
                    </a>
                    <p className="text-muted small mb-0 mt-1">
                      <i className="fas fa-reply me-1"></i>
                      Balasan dalam 24 jam
                    </p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="contact-social-card">
                  <h5 className="fw-bold mb-3">Ikuti Kami</h5>
                  <p className="text-muted mb-3">Dapatkan inspirasi dan update terbaru</p>
                  <div className="social-icons-contact">
                    <a 
                      href="https://instagram.com/narativa.id" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-icon instagram"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a 
                      href="https://wa.me/628174982969" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-icon whatsapp"
                    >
                      <i className="fab fa-whatsapp"></i>
                    </a>
                    <a 
                      href="mailto:officials.narativa@gmail.com"
                      className="social-icon email"
                    >
                      <i className="fas fa-envelope"></i>
                    </a>
                    <a 
                      href="https://facebook.com/narativa.id" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-icon facebook"
                    >
                      <i className="fab fa-facebook"></i>
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="business-hours-card">
                  <h5 className="fw-bold mb-3">
                    <i className="fas fa-clock me-2"></i>Jam Operasional
                  </h5>
                  <div className="hours-item">
                    <span>Senin - Jumat</span>
                    <span className="text-primary fw-semibold">09:00 - 21:00</span>
                  </div>
                  <div className="hours-item">
                    <span>Sabtu - Minggu</span>
                    <span className="text-primary fw-semibold">10:00 - 20:00</span>
                  </div>
                  <div className="alert alert-info mt-3 mb-0">
                    <i className="fas fa-info-circle me-2"></i>
                    <small>Support WhatsApp tersedia 24/7</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container-fluid px-0">
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.224489686648!2d105.26160931476895!3d-5.383116596040892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c5d1b8a0e7a7%3A0x8b8d8b8d8b8d8b8d!2sBandar%20Lampung%2C%20Lampung!5e0!3m2!1sen!2sid!4v1234567890123"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Quick Contact */}
      <section className="faq-contact-section py-5 bg-light">
        <div className="container py-5">
          <div className="row justify-content-center scroll-animate fade-up">
            <div className="col-lg-8 text-center">
              <h3 className="fw-bold mb-3">Pertanyaan Umum Sebelum Menghubungi</h3>
              <p className="text-muted mb-4">Mungkin jawabannya sudah ada di sini</p>
              <div className="quick-faq">
                <div className="faq-item">
                  <i className="fas fa-question-circle"></i>
                  <p><strong>Berapa lama proses pembuatan?</strong><br />
                  <small className="text-muted">1-2 hari kerja setelah materi lengkap</small></p>
                </div>
                <div className="faq-item">
                  <i className="fas fa-question-circle"></i>
                  <p><strong>Apakah bisa revisi?</strong><br />
                  <small className="text-muted">Ya, sesuai paket yang dipilih</small></p>
                </div>
                <div className="faq-item">
                  <i className="fas fa-question-circle"></i>
                  <p><strong>Minimal order berapa?</strong><br />
                  <small className="text-muted">Tidak ada minimal order</small></p>
                </div>
              </div>
              <a href="/tentang" className="btn btn-outline-primary mt-4">
                <i className="fas fa-info-circle me-2"></i>
                Lihat FAQ Lengkap
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}