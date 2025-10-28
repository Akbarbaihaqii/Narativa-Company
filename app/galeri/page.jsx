"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function GaleriPage() {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from("templates")
        .select("*")
        .order("dibuat_pada", { ascending: false });
      if (!error) setTemplates(data);
    };
    fetchTemplates();
  }, []);

  return (
    <section className="gallery-section py-5">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">
            Galeri <span className="text-gradient">Template</span>
          </h1>
          <p className="lead text-muted">Temukan desain sempurna untuk momen spesialmu.</p>
        </div>
        <div className="row g-4">
          {templates.length > 0 ? (
            templates.map((t, i) => (
              <div key={t.id} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={100 * (i + 1)}>
                <div className="gallery-card-modern">
                  <div className="card-img-container">
                    <img src={t.url_gambar} className="img-fluid" alt={t.judul} />
                    <div className="card-img-overlay">
                      <a href={t.link_demo} target="_blank" className="overlay-icon"><i className="fas fa-link"></i></a>
                    </div>
                  </div>
                  <div className="card-body">
                    <span className="category-badge">{t.kategori}</span>
                    <h5 className="fw-bold mt-2">{t.judul}</h5>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted">Belum ada template yang tersedia.</div>
          )}
        </div>
      </div>
    </section>
  );
}
