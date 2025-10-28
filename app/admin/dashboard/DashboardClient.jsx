'use client'

import { useEffect, useState, useTransition } from 'react' // Tambah useTransition
import { useRouter } from 'next/navigation'
import Link from 'next/link'
// Import KLIEN PUBLIK dari lib (untuk cek admin & logout)
import { supabase } from '@/lib/supabaseClient' 
// Import SERVER ACTION untuk hapus
import { deleteTemplateAction } from './actions' 

// Terima data awal (initialTemplates) dari Server Component (page.jsx)
export default function DashboardClient({ initialTemplates = [], adminEmail }) {
  const router = useRouter()
  // State untuk menyimpan daftar template (diinisialisasi dari props)
  const [templates, setTemplates] = useState(initialTemplates) 
  // State untuk nama admin (diambil dari localStorage atau props)
  const [adminName, setAdminName] = useState('Admin'); 
  // State transisi untuk loading saat panggil Server Action
  const [isPending, startTransition] = useTransition() 
  // State untuk menyimpan pesan error
  const [error, setError] = useState(null)
  // State loading awal saat komponen pertama kali mount & cek admin
  const [isLoading, setIsLoading] = useState(true); 

  // --- EFEK UNTUK CEK LOGIN & AMBIL NAMA ADMIN ---
  useEffect(() => {
    // Pastikan hanya jalan di browser
    if (typeof window !== 'undefined') {
      const checkAdmin = async () => {
        setIsLoading(true); // Mulai loading
        setError(null); 
        const adminId = localStorage.getItem("admin_id"); // Ambil ID dari localStorage
        
        // Jika tidak ada ID di localStorage, redirect ke login
        if (!adminId) {
          console.log("DashboardClient: No admin_id found, redirecting...");
          router.replace("/admin/login"); 
          return; 
        }

        try {
          // Ambil nama & email admin dari tabel 'admins' pakai Kunci Publik
          console.log(`DashboardClient: Fetching admin data for ID: ${adminId}`);
          const { data, error: fetchError } = await supabase
            .from("admins") // Pastikan nama tabel 'admins' benar
            .select("nama, email") 
            .eq("id", adminId)
            .single(); // Harapannya hanya 1 admin per ID

          // Jika gagal fetch atau data admin tidak ditemukan
          if (fetchError || !data) {
            console.error("DashboardClient: Failed to fetch admin data or admin not found:", fetchError?.message || 'No data');
            // Hapus localStorage yang mungkin salah & redirect ke login
            localStorage.removeItem("admin_id");
            localStorage.removeItem("isAdminLoggedIn"); 
            localStorage.removeItem("adminEmail"); 
            router.replace("/admin/login?error=invalid_admin_data"); 
          } else {
            // Jika berhasil, set nama admin dan pastikan flag login ada
            console.log("DashboardClient: Admin data fetched:", data);
            setAdminName(data.nama || 'Admin'); // Set nama
            localStorage.setItem("isAdminLoggedIn", "true"); 
            localStorage.setItem("adminEmail", data.email); 
          }
        } catch(err) {
            // Tangani error tak terduga saat cek admin
            console.error("DashboardClient: Error during admin check:", err);
            setError("Gagal memverifikasi sesi admin.");
            localStorage.removeItem("admin_id");
            localStorage.removeItem("isAdminLoggedIn"); 
            localStorage.removeItem("adminEmail"); 
            router.replace("/admin/login?error=verification_error");
        } finally {
           setIsLoading(false); // Selesai loading cek admin
        }
      };
      checkAdmin(); // Jalankan fungsi cek admin
    }
  }, [router]); // Jalankan useEffect saat router berubah (sekali saat mount)

  // --- FUNGSI LOGOUT ---
  const handleLogout = async () => {
    setIsLoading(true); // Tampilkan loading
    setError(null);
    try {
      // Panggil signOut dari Supabase Auth (pakai Klien Publik)
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
      
      console.log("DashboardClient: Logout successful via Supabase.");
      
      // Hapus semua item terkait admin dari localStorage
      localStorage.removeItem("admin_id");
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminEmail");
      console.log("DashboardClient: Admin localStorage cleared.");
      
      // Redirect ke login
      router.replace("/admin/login"); 
    } catch (logoutError) {
       console.error("DashboardClient: Logout error:", logoutError);
       setError("Gagal logout: " + logoutError.message);
       setIsLoading(false); // Hentikan loading jika logout error
    } 
  }

  // --- FUNGSI HAPUS (MEMANGGIL SERVER ACTION) ---
  const handleDelete = async (template) => {
    // Validasi sederhana di client sebelum kirim ke server
    if (!template || !template.id || !template.url_gambar) {
       setError("Data template tidak lengkap untuk dihapus.");
       return;
    }
    
    // Konfirmasi ke user
    if (!confirm(`Anda yakin ingin menghapus template "${template.judul}" secara permanen? Aksi ini tidak bisa dibatalkan.`)) {
        return; // Batal jika user klik 'Cancel'
    }

    setError(null) // Reset error

    // Jalankan Server Action di dalam startTransition
    // Ini akan otomatis set isPending jadi true saat action jalan, false saat selesai
    startTransition(async () => { 
      console.log(`[DashboardClient] Calling deleteTemplateAction for ID: ${template.id}`);
      // Panggil fungsi Server Action dari actions.js
      const result = await deleteTemplateAction(template) 
      
      // Cek hasil yang dikembalikan oleh Server Action
      if (result?.error) { // Jika ada property 'error'
        console.error('[DashboardClient] Server Action returned error:', result.error);
        setError(result.error) // Tampilkan error di UI
      } else if (result?.success) { // Jika ada property 'success'
        console.log('[DashboardClient] Server Action success, removing template from state.');
        // Update state 'templates' di client untuk menghapus item dari UI
        setTemplates(currentTemplates => currentTemplates.filter(t => t.id !== template.id))
        // Beri notifikasi sukses (opsional)
        // alert('Template berhasil dihapus.') 
      } else {
         // Handle jika Server Action mengembalikan sesuatu yang tidak terduga
         console.error('[DashboardClient] Unexpected result from Server Action:', result);
         setError('Terjadi kesalahan tidak diketahui saat menghapus.')
      }
    })
  }

  // Tampilkan loading saat cek admin awal
  if (isLoading) {
      return (
         <div className="container py-5 text-center">
           <div className="spinner-border text-primary" role="status">
             <span className="visually-hidden">Loading...</span>
           </div>
           <p className="mt-2 text-muted">Memverifikasi sesi admin...</p>
         </div>
      );
  }

  // Tampilan Utama Dashboard (setelah loading selesai)
  return (
    <main className="container py-5">
      {/* --- BAGIAN ATAS DASHBOARD --- */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
         <div>
          <h2 className="fw-bold mb-1">Dashboard Admin</h2>
          {/* Tampilkan nama admin dari state */}
          <p className="text-muted mb-0">Selamat datang, {adminName}</p> 
        </div>
        <div className="d-flex gap-2">
           {/* Tombol Tambah Template (Link ke halaman tambah) */}
           <Link href="/admin/tambah-template" className="btn btn-primary">
            + Tambah Template
          </Link>
          {/* Tombol Logout */}
          <button onClick={handleLogout} className="btn btn-danger" disabled={isPending || isLoading}> 
            Logout
          </button>
        </div>
      </div>

      {/* Tampilkan Error jika ada */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error:</strong> {error}
          <button type="button" className="btn-close" onClick={() => setError(null)} aria-label="Close"></button>
        </div>
      )}

      {/* --- TABEL TEMPLATE --- */}
      <div className="table-responsive shadow-sm rounded border">
        <table className="table table-striped table-hover align-middle mb-0">
          <thead className="table-dark">
             <tr>
              <th scope="col" style={{width: '60px'}} className="text-center">#</th>
              <th scope="col" style={{width: '120px'}}>Gambar</th>
              <th scope="col">Judul</th>
              <th scope="col">Kategori</th>
              <th scope="col">Preview</th>
              <th scope="col" style={{ width: '150px' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {/* Cek jika 'templates' adalah array dan punya isi */}
            {Array.isArray(templates) && templates.length > 0 ? (
              // Looping data template
              templates.map((template, index) => ( 
                <tr key={template.id}>
                   <td className="text-center fw-medium">{index + 1}</td> 
                   <td>
                    {/* Tampilkan gambar dengan fallback jika URL salah/kosong */}
                    <img 
                      src={template.url_gambar || 'https://placehold.co/100x70/eee/aaa?text=No+Image'} 
                      alt={template.judul || 'Template Image'} 
                      style={{ width: '100px', height: '70px', borderRadius: '8px', objectFit: 'cover' }} 
                      // Fallback jika gambar gagal load
                      onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x70/eee/aaa?text=Load+Error'; }} 
                    />
                  </td>
                  <td className="fw-medium">{template.judul || '-'}</td>
                  <td><span className="badge bg-secondary">{template.kategori || '-'}</span></td>
                  <td>
                    {/* Tombol Preview (Link Demo) */}
                    {template.link_demo ? (
                      <a href={template.link_demo} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
                        Buka
                      </a>
                    ) : ( <span className="text-muted small">N/A</span> )}
                  </td>
                  <td>
                     {/* Tombol Edit (Link ke halaman edit) */}
                     <Link href={`/admin/edit-template/${template.id}`} className="btn btn-sm btn-warning me-2" aria-label={`Edit ${template.judul}`}>
                       Edit
                     </Link> 
                     {/* Tombol Hapus (Panggil handleDelete) */}
                    <button 
                      onClick={() => handleDelete(template)} // Panggil fungsi ini saat diklik
                      className="btn btn-sm btn-danger"
                      // Disable tombol HAPUS jika ada proses Server Action berjalan
                      disabled={isPending} 
                      aria-label={`Hapus ${template.judul}`}
                    >
                      {/* Tampilkan spinner jika isPending (sedang hapus) */}
                      {isPending ? ( 
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : ( 'Hapus' )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              // Pesan jika tidak ada template
              <tr>
                <td colSpan="6" className="text-center p-5 text-muted"> 
                  Belum ada template ditambahkan. <br/>
                  Silakan klik tombol "+ Tambah Template" di atas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}