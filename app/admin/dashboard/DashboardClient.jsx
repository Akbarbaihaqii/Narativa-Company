'use client'
import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient' 
import { deleteTemplateAction } from './actions' 

export default function DashboardClient({ initialTemplates = [], adminEmail }) {
  const router = useRouter()
  const [templates, setTemplates] = useState(initialTemplates) 
  const [adminName, setAdminName] = useState('Admin'); 
  const [isPending, startTransition] = useTransition() 
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkAdmin = async () => {
        setIsLoading(true);
        setError(null); 
        const adminId = localStorage.getItem("admin_id");
        
        if (!adminId) {
          console.log("DashboardClient: No admin_id found, redirecting...");
          router.replace("/admin/login"); 
          return; 
        }
        try {
          console.log(`DashboardClient: Fetching admin data for ID: ${adminId}`);
          const { data, error: fetchError } = await supabase
            .from("admins")
            .select("nama, email") 
            .eq("id", adminId)
            .single();

          if (fetchError || !data) {
            console.error("DashboardClient: Failed to fetch admin data or admin not found:", fetchError?.message || 'No data');
            localStorage.removeItem("admin_id");
            localStorage.removeItem("isAdminLoggedIn"); 
            localStorage.removeItem("adminEmail"); 
            router.replace("/admin/login?error=invalid_admin_data"); 
          } else {
            console.log("DashboardClient: Admin data fetched:", data);
            setAdminName(data.nama || 'Admin');
            localStorage.setItem("isAdminLoggedIn", "true"); 
            localStorage.setItem("adminEmail", data.email); 
          }
        } catch(err) {
            console.error("DashboardClient: Error during admin check:", err);
            setError("Gagal memverifikasi sesi admin.");
            localStorage.removeItem("admin_id");
            localStorage.removeItem("isAdminLoggedIn"); 
            localStorage.removeItem("adminEmail"); 
            router.replace("/admin/login?error=verification_error");
        } finally {
           setIsLoading(false);
        }
      };
      checkAdmin();
    }
  }, [router]);

  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
      
      console.log("DashboardClient: Logout successful via Supabase.");
      
      localStorage.removeItem("admin_id");
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminEmail");
      console.log("DashboardClient: Admin localStorage cleared.");
      
      router.replace("/admin/login"); 
    } catch (logoutError) {
       console.error("DashboardClient: Logout error:", logoutError);
       setError("Gagal logout: " + logoutError.message);
       setIsLoading(false);
    } 
  }

  const handleDelete = async (template) => {
    if (!template || !template.id || !template.url_gambar) {
       setError("Data template tidak lengkap untuk dihapus.");
       return;
    }
    
    if (!confirm(`Anda yakin ingin menghapus template "${template.judul}" secara permanen? Aksi ini tidak bisa dibatalkan.`)) {
        return;
    }
    setError(null)
    
    startTransition(async () => { 
      console.log(`[DashboardClient] Calling deleteTemplateAction for ID: ${template.id}`);
      const result = await deleteTemplateAction(template) 
      
      if (result?.error) {
        console.error('[DashboardClient] Server Action returned error:', result.error);
        setError(result.error)
      } else if (result?.success) {
        console.log('[DashboardClient] Server Action success, removing template from state.');
        setTemplates(currentTemplates => currentTemplates.filter(t => t.id !== template.id))
      } else {
         console.error('[DashboardClient] Unexpected result from Server Action:', result);
         setError('Terjadi kesalahan tidak diketahui saat menghapus.')
      }
    })
  }

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

  return (
    <main className="container" style={{ paddingTop: '100px', paddingBottom: '40px' }}>
      {/* HEADER SECTION - Responsive Stack */}
      <div className="row g-3 mb-4">
        {/* Kolom Kiri: Judul & Welcome Message */}
        <div className="col-12 col-lg-6">
          <h2 className="fw-bold mb-2">Dashboard Admin</h2>
          <p className="text-muted mb-0">Selamat datang, {adminName}</p> 
        </div>
        
        {/* Kolom Kanan: Tombol Action */}
        <div className="col-12 col-lg-6 d-flex justify-content-lg-end align-items-start gap-2">
          <Link 
            href="/admin/tambah-template" 
            className="btn btn-primary flex-grow-1 flex-lg-grow-0"
          >
            + Tambah Template
          </Link>
          <button 
            onClick={handleLogout} 
            className="btn btn-danger flex-grow-1 flex-lg-grow-0" 
            disabled={isPending || isLoading}
          > 
            Logout
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
          <strong>Error:</strong> {error}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setError(null)} 
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* TABLE SECTION */}
      <div className="table-responsive shadow-sm rounded border">
        <table className="table table-striped table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th scope="col" className="text-center" style={{width: '60px'}}>#</th>
              <th scope="col" style={{minWidth: '120px'}}>Gambar</th>
              <th scope="col" style={{minWidth: '200px'}}>Judul</th>
              <th scope="col" style={{minWidth: '150px'}}>Kategori</th>
              <th scope="col" style={{minWidth: '100px'}}>Preview</th>
              <th scope="col" className="text-center" style={{minWidth: '180px'}}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(templates) && templates.length > 0 ? (
              templates.map((template, index) => ( 
                <tr key={template.id}>
                  <td className="text-center fw-medium">{index + 1}</td> 
                  <td>
                    <img 
                      src={template.url_gambar || 'https://placehold.co/100x70/eee/aaa?text=No+Image'} 
                      alt={template.judul || 'Template Image'} 
                      className="rounded"
                      style={{ 
                        width: '100px', 
                        height: '70px', 
                        objectFit: 'cover',
                        display: 'block'
                      }} 
                      onError={(e) => { 
                        e.currentTarget.src = 'https://placehold.co/100x70/eee/aaa?text=Load+Error'; 
                      }} 
                    />
                  </td>
                  <td className="fw-medium">{template.judul || '-'}</td>
                  <td>
                    <span className="badge bg-secondary">
                      {template.kategori || '-'}
                    </span>
                  </td>
                  <td>
                    {template.link_demo ? (
                      <a 
                        href={template.link_demo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-sm btn-outline-primary"
                      >
                        Buka
                      </a>
                    ) : (
                      <span className="text-muted small">N/A</span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center flex-wrap">
                      <Link 
                        href={`/admin/edit-template/${template.id}`} 
                        className="btn btn-sm btn-warning" 
                        aria-label={`Edit ${template.judul}`}
                      >
                        Edit
                      </Link> 
                      <button 
                        onClick={() => handleDelete(template)}
                        className="btn btn-sm btn-danger"
                        disabled={isPending} 
                        aria-label={`Hapus ${template.judul}`}
                      >
                        {isPending ? ( 
                          <span 
                            className="spinner-border spinner-border-sm" 
                            role="status" 
                            aria-hidden="true"
                          ></span>
                        ) : (
                          'Hapus'
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-5"> 
                  <div className="text-muted">
                    <p className="mb-2">Belum ada template ditambahkan.</p>
                    <p className="mb-0">Silakan klik tombol "+ Tambah Template" di atas.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}