"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; 
import { FaLink } from "react-icons/fa"; 
// 👇 PASTIKAN IMPORT CSS INI BENAR
import './Galeri.css'; 
console.log("[GaleriPage] Component loaded, Galeri.css imported."); // Log Awal

export default function GaleriPage() {
  console.log("[GaleriPage] Rendering component..."); 
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // --- Efek untuk Fetch Data ---
  useEffect(() => {
    console.log("[GaleriPage] useEffect triggered."); 
    const fetchTemplates = async () => {
      setLoading(true); 
      setError(null); 
      console.log("[GaleriPage] Starting fetch..."); 
      try {
        const { data, error: fetchError, status } = await supabase
          .from("templates") 
          .select("id, judul, kategori, link_demo, url_gambar, deskripsi") 
          .order("dibuat_pada", { ascending: false }); 

        console.log("[GaleriPage] Supabase fetch response:", { status, hasData: !!data, fetchError });

        if (fetchError) {
           console.error("[GaleriPage] Supabase fetch error:", fetchError);
           if (status === 401 || status === 403) {
             throw new Error("Gagal memuat template: Masalah izin akses data. Cek RLS Policy di Supabase.");
           } else {
             throw new Error(fetchError.message || "Gagal menghubungi database."); 
           }
        }
        
        if (Array.isArray(data)) {
           setTemplates(data); 
           console.log(`[GaleriPage] ${data.length} templates successfully set to state.`);
        } else {
           console.warn("[GaleriPage] Received non-array data from Supabase:", data);
           setTemplates([]); 
        }

      } catch (err) {
         console.error("[GaleriPage] Catch block error:", err);
         setError(err.message || "Terjadi kesalahan saat memuat template."); 
         setTemplates([]); 
      } finally {
         setLoading(false); 
         console.log("[GaleriPage] Fetch finished. Loading:", false, "Error state:", error); 
      }
    };
    fetchTemplates(); 
  }, []); 

  // --- Render Tampilan ---
  console.log("[GaleriPage] Determining render output - Loading:", loading, "Error state:", error, "Templates count:", templates.length);

  // Tampilkan Loading State
  if (loading) {
    console.log("[GaleriPage] Rendering Loading State...");
    return (
       // Gunakan class dari Galeri.css
       <section className="gallerySection"> 
         <div className="galleryContainer loadingContainer"> 
           <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
             <span className="visually-hidden">Loading...</span>
           </div>
           <p className="mt-3 text-muted fs-5">Memuat galeri template...</p>
         </div>
       </section>
    );
  }

  // Tampilkan Error State
  if (error) { 
     console.log("[GaleriPage] Rendering Error State...");
    return (
       <section className="gallerySection">
         <div className="galleryContainer errorContainer"> 
           <div className="alert alert-danger col-lg-8 mx-auto text-center" role="alert">
             <h4 className="alert-heading">Oops! Terjadi Kesalahan</h4>
             <p>{error}</p> 
             <hr />
             <p className="mb-0">Silakan coba refresh halaman (Ctrl+Shift+R) atau hubungi admin.</p>
           </div>
         </div>
       </section>
    );
  }

  // Tampilkan Galeri
  console.log("[GaleriPage] Rendering Gallery Grid/Empty State...");
  return (
    // Gunakan class dari Galeri.css
    <section className="gallerySection"> 
      <div className="galleryContainer"> 
        {/* Judul */}
        {/* Hapus is-visible jika animasi scroll jalan */}
        <div className="galleryTitleWrapper scroll-animate fade-up is-visible"> 
          <h1 className="galleryTitle">
            Galeri <span className="textGradient">Template</span>
          </h1>
          <p className="gallerySubtitle">Temukan desain undangan digital modern dan elegan yang sempurna untuk momen spesial Anda.</p>
        </div>

        {/* Cek jika array templates KOSONG */}
        {/* Hapus is-visible jika animasi scroll jalan */}
        {templates.length === 0 ? (
           <div className="emptyContainer scroll-animate fade-up is-visible"> 
              <p className="fs-5 text-muted">Yah, belum ada template yang tersedia saat ini.</p>
              <p className="text-muted">Silakan cek kembali nanti atau tambahkan template baru di dashboard admin.</p>
            </div>
        ) : (
          // Jika ADA template, map dan tampilkan
          // Gunakan class galleryGrid dari Galeri.css
          // Di mobile, CSS akan membuatnya jadi slider horizontal
          <div className="galleryGrid"> 
            {templates.map((t, i) => (
              // Hapus is-visible jika animasi scroll jalan
              // Key harus unik
              <div key={t.id || `template-${i}`} className="scroll-animate fade-up is-visible" style={{ animationDelay: `${i * 50}ms` }}> 
                {/* Kartu Template */}
                <div className="templateCard"> 
                  {/* Wadah Gambar & Overlay Link */}
                  <div className="cardImageContainer"> 
                    <img 
                      src={t.url_gambar || 'https://placehold.co/600x450/eee/aaa?text=Gambar+Error'} 
                      className="cardImage" 
                      alt={t.judul || 'Template preview'} 
                      loading="lazy" 
                      onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x450/eee/aaa?text=Gagal+Load'; }} 
                    />
                    {/* Overlay Link */}
                    {t.link_demo && (
                      <div className="cardOverlay">
                        <a 
                          href={t.link_demo} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="overlayLinkButton"
                          aria-label={`Lihat demo ${t.judul}`}
                         >
                          <FaLink /> 
                        </a>
                      </div>
                    )}
                  </div> 
                  
                  {/* Body Kartu */}
                  <div className="cardBody"> 
                    <span className="categoryBadge">{t.kategori || 'Umum'}</span> 
                    <h5 className="cardTitle">{t.judul || 'Tanpa Judul'}</h5>
                    {/* Deskripsi (opsional) */}
                    {t.deskripsi && 
                      <p className="cardDescription">
                          {t.deskripsi.substring(0, 80)}{t.deskripsi.length > 80 ? '...' : ''}
                      </p>
                    } 
                  </div>
                  
                  {/* Footer Kartu SUDAH DIHAPUS */}

                </div> {/* End templateCard */}
              </div> // End grid item
            ))} {/* End map */}
          </div> // End galleryGrid
        )} 
      </div> {/* End galleryContainer */}
    </section> // End gallerySection
  );
}

