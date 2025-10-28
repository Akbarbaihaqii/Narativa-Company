'use client'
// 👇 Import React, hook, dan Link
import React, { useEffect, useState, useTransition, useRef } from 'react' 
import { useRouter } from 'next/navigation'
import Link from 'next/link' 
// 👇 IMPORT SERVER ACTION DENGAN NAMA YANG BENAR
import { tambahTemplateAction } from './actions' 

export default function TambahTemplatePage() {
  const router = useRouter()
  // Ref untuk input file & form
  const fileInputRef = useRef(null); 
  const formRef = useRef(null); 
  // State transisi untuk loading Server Action
  // isPending akan true saat server action sedang berjalan
  const [isPending, startTransition] = useTransition() 
  // State untuk pesan error dari client atau server
  const [error, setError] = useState(null)
  // State untuk pesan sukses (opsional)
  const [successMessage, setSuccessMessage] = useState(''); 

  // --- Cek Login ---
   useEffect(() => {
    // Pastikan hanya jalan di browser
    if (typeof window !== 'undefined') {
        const isAdmin = localStorage.getItem('isAdminLoggedIn') === 'true'
        // Jika tidak login, redirect ke halaman login pakai replace
        if (!isAdmin) {
          console.log("TambahTemplatePage: Not logged in, redirecting...");
          router.replace('/admin/login') 
        } else {
           console.log("TambahTemplatePage: Admin is logged in.");
        }
    }
  }, [router]) // Jalankan saat mount / router berubah

  // --- Fungsi Handle Submit Form ---
  const handleSubmit = async (e) => {
    e.preventDefault() // Mencegah reload halaman standar form
    setError(null) // Reset error setiap kali submit
    setSuccessMessage(''); // Reset pesan sukses

    // Ambil semua data dari form menggunakan FormData API browser
    const formData = new FormData(e.currentTarget) 

    // --- Validasi Sederhana di Client (PENTING!) ---
    // Ini mencegah pengiriman data yang tidak perlu ke server jika sudah jelas salah
    const judul = formData.get('judul');
    const kategori = formData.get('kategori');
    const linkDemo = formData.get('linkDemo');
    const gambar = formData.get('gambar');

    // Cek field kosong
    if (!judul || !kategori || !linkDemo || !gambar || gambar.size === 0) {
      setError('Semua kolom wajib diisi, termasuk gambar!'); 
      return; // Hentikan fungsi jika validasi gagal
    }
    // Validasi ukuran (contoh: maks 2MB)
    const maxSize = 2 * 1024 * 1024; // 2 MB
    if (gambar.size > maxSize) {
      setError(`Ukuran gambar maksimal ${maxSize / 1024 / 1024}MB.`);
      return;
    }
    // Validasi tipe file gambar
    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowedTypes.includes(gambar.type)) {
      setError('Format gambar harus PNG, JPG, atau WEBP.');
      return;
    }
    // Optional: Validasi format URL sederhana
    if (!linkDemo.startsWith('http://') && !linkDemo.startsWith('https://')) {
        setError('Format Link Demo tidak valid. Harap gunakan http:// atau https://');
        return;
    }
    // --- END VALIDASI CLIENT ---
    
    // --- Panggil Server Action ---
    // Gunakan startTransition agar Next.js tahu ini adalah update state
    // yang mungkin memicu loading/disabled state di UI
    startTransition(async () => {
       console.log('[Tambah Client] Calling tambahTemplateAction...'); 
       try {
           // Panggil fungsi Server Action dari actions.js
           const result = await tambahTemplateAction(formData); 

           console.log('[Tambah Client] Server Action Result:', result); 

           // Cek hasil yang dikembalikan oleh Server Action
           if (result && result.error) {
             // Jika server mengembalikan object dengan key 'error'
             console.error('[Tambah Client] Server Action returned error:', result.error); 
             setError(result.error); // Tampilkan pesan error dari server di UI
           } 
           // Jika TIDAK ada error (berarti sukses dan server sudah redirect)
           // Server action yang sukses akan redirect, kita tidak perlu lakukan apa-apa lagi di sini
           // Mungkin hanya menampilkan pesan sukses sesaat sebelum redirect terjadi
           else if (!result?.error) { 
             console.log('[Tambah Client] Server Action Success (Redirect should happen from server)'); 
             setSuccessMessage('Template berhasil ditambahkan! Mengarahkan ke dashboard...'); 
             // Reset form setelah sukses (opsional, karena akan redirect)
             if (formRef.current) {
                 formRef.current.reset(); 
             }
           }
           
       } catch (actionError) {
          // Tangani error JIKA PEMANGGILAN action itu sendiri gagal (jarang terjadi)
          console.error('[Tambah Client] Error calling Server Action:', actionError);
          setError('Gagal menghubungi server. Coba lagi nanti.');
       }
    }); // --- End startTransition ---
  } // --- End handleSubmit ---

  // --- Render Tampilan Halaman ---
  return (
    <main className="container py-5" style={{ maxWidth: '960px', margin: 'auto' }}>
      {/* Judul dan Tombol Kembali */}
      <div className="d-flex justify-content-between align-items-center mb-5">
         <h2 className="fw-bold mb-0">Tambah Template Baru</h2>
         <Link href="/admin/dashboard" className="btn btn-outline-secondary">
           &larr; Kembali ke Dashboard
         </Link>
      </div>

      {/* Tampilkan Error jika ada */}
      {error && !isPending && ( // Jangan tampilkan error saat loading
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)} aria-label="Close"></button>
        </div>
      )}
      {/* Tampilkan Pesan Sukses jika ada */}
       {successMessage && !isPending && ( // Tampilkan hanya jika tidak loading
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {/* Form Tambah Template */}
      {/* Hubungkan formRef ke elemen form */}
      <form ref={formRef} onSubmit={handleSubmit} className="col-lg-8 mx-auto p-4 p-md-5 border rounded-3 bg-light">
        {/* Input Judul */}
        <div className="mb-3">
          <label htmlFor="judul" className="form-label">Judul Template</label>
          <input
            type="text"
            id="judul"
            name="judul" // WAJIB ADA NAME untuk FormData
            className="form-control"
            required
            placeholder="Contoh: Undangan Pernikahan Elegan"
            // Disable input saat Server Action berjalan (isPending)
            disabled={isPending} 
          />
        </div>
        {/* Input Kategori */}
        <div className="mb-3">
          <label htmlFor="kategori" className="form-label">Kategori</label>
          <input
            type="text"
            id="kategori"
            name="kategori" // WAJIB ADA NAME
            className="form-control"
            required
            placeholder="Contoh: Pernikahan"
            disabled={isPending}
          />
        </div>
        {/* Input Link Demo */}
        <div className="mb-3">
          <label htmlFor="linkDemo" className="form-label">Link Demo</label>
          <input
            type="url"
            id="linkDemo"
            name="linkDemo" // WAJIB ADA NAME
            className="form-control"
            required
            placeholder="https://contoh-demo.com"
            disabled={isPending}
          />
        </div>
         {/* Input File Gambar */}
         <div className="mb-3">
          <label htmlFor="gambar" className="form-label">Upload Gambar Template</label>
          <input
            type="file"
            id="gambar"
            name="gambar" // WAJIB ADA NAME
            className="form-control"
            accept="image/png, image/jpeg, image/webp" // Batasi tipe file
            ref={fileInputRef} // Hubungkan ref 
            required
            disabled={isPending}
          />
          <small className="form-text text-muted">Format: JPG, PNG, WEBP. Maks: 2MB.</small>
        </div>

        <hr className="my-4" />

        {/* Tombol Submit */}
        <button
          type="submit"
          className="btn btn-primary w-100 btn-lg"
          // Disable tombol saat Server Action berjalan
          disabled={isPending} 
        >
          {/* Tampilkan teks/spinner berdasarkan isPending */}
          {isPending ? (
             <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Menyimpan...
              </>
          ) : 'Simpan Template'}
        </button>
      </form>
    </main>
  )
}

