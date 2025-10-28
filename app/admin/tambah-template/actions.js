'use server' // <-- WAJIB ADA

import { supabaseAdmin } from '@/lib/supabaseAdmin' // Klien Admin (pakai Kunci Rahasia)
import { revalidatePath } from 'next/cache' // Untuk update cache
import { redirect } from 'next/navigation' // Untuk pindah halaman setelah sukses
import { cookies } from 'next/headers' // Untuk cek sesi login di server
import { createServerActionClient } from '@supabase/auth-helpers-nextjs' // Helper cek sesi

// Ini adalah fungsi Server Action yang akan dipanggil oleh form di page.jsx
export async function tambahTemplateAction(formData) {
  
  // --- LANGKAH 1: Cek otentikasi admin di server (WAJIB!) ---
  const supabaseAuth = createServerActionClient({ cookies }) // Buat klien Auth helper
  const { data: { session }, error: sessionError } = await supabaseAuth.auth.getSession()
  
  // Jika error ambil sesi atau tidak ada sesi (belum login)
  if (sessionError || !session) {
    console.error('[Action:Tambah] Auth Error:', sessionError?.message || 'No active session');
    // Kembalikan error ke client JIKA BELUM LOGIN
    return { error: 'Akses ditolak. Sesi tidak valid atau Anda belum login.' } 
  }
  console.log(`[Action:Tambah] User ${session.user.email} authenticated.`);

  // --- Variabel untuk hasil akhir ---
  let fileName = ''; // Definisikan di luar try-catch agar bisa dipakai di catch
  let publicUrl = ''; // Definisikan di luar

  try {
    // --- LANGKAH 2: Ambil & Validasi data dari form ---
    const judul = formData.get('judul')?.toString().trim(); 
    const kategori = formData.get('kategori')?.toString().trim();
    const linkDemo = formData.get('linkDemo')?.toString().trim();
    const gambar = formData.get('gambar'); // Ini objek File

    if (!judul || !kategori || !linkDemo || !gambar || typeof gambar !== 'object' || gambar.size === 0) {
      throw new Error('Semua kolom wajib diisi, termasuk gambar yang valid.'); // Lempar error
    }
    const maxSize = 2 * 1024 * 1024; // 2 MB
    if (gambar.size > maxSize) {
       throw new Error(`Ukuran gambar tidak boleh lebih dari ${maxSize / 1024 / 1024}MB.`);
    }
    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowedTypes.includes(gambar.type)) {
       throw new Error('Format gambar yang diizinkan hanya PNG, JPG, atau WEBP.');
    }
    try { new URL(linkDemo) } catch (_) {
       throw new Error('Format Link Demo tidak valid. Gunakan https://...');
    }
    // --- END VALIDASI ---


    // --- LANGKAH 3: Buat nama file yang unik & aman ---
    const safeOriginalName = gambar.name.replace(/[^a-zA-Z0-9.-]/g, '-');
    fileName = `${Date.now()}-${safeOriginalName}`; 
    
    // --- LANGKAH 4: UPLOAD GAMBAR ke Supabase Storage (pakai Kunci Admin) ---
    console.log(`[Action:Tambah] Uploading ${fileName}...`); 
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('template-images') // Pastikan nama bucket benar
      .upload(fileName, gambar, { upsert: false }); // Gagal jika nama file sudah ada

    if (uploadError) throw uploadError // Lempar error jika upload gagal
    console.log('[Action:Tambah] Upload success:', uploadData); 

    // --- LANGKAH 5: AMBIL URL PUBLIK gambar ---
    console.log(`[Action:Tambah] Getting public URL for ${fileName}...`); 
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('template-images')
      .getPublicUrl(fileName);
      
    if (!publicUrlData?.publicUrl) {
       // Coba hapus gambar jika URL gagal didapat (rollback kecil)
       await supabaseAdmin.storage.from('template-images').remove([fileName]);
       throw new Error('Gagal mendapatkan URL publik gambar setelah upload.');
    }
    publicUrl = publicUrlData.publicUrl; // Simpan URL ke variabel
    console.log('[Action:Tambah] Public URL:', publicUrl); 


    // --- LANGKAH 6: INSERT DATA ke tabel 'templates' (pakai Kunci Admin) ---
    console.log('[Action:Tambah] Inserting data to templates table...'); 
    const { data: insertedData, error: insertError } = await supabaseAdmin
      .from('templates') // Pastikan nama tabel benar
      .insert([ {
        judul: judul,
        kategori: kategori,
        link_demo: linkDemo,
        url_gambar: publicUrl, // Pakai URL tadi
        dibuat_pada: new Date().toISOString(), 
      } ])
      .select('id') // Minta ID kembali
      .single(); 

    if (insertError) throw insertError // Lempar error jika insert gagal
    if (!insertedData) throw new Error('Insert data berhasil tapi tidak ada konfirmasi dari database.');
    console.log('[Action:Tambah] Insert success, new ID:', insertedData.id); 

    // --- JIKA SEMUA TRY BERHASIL ---
    
    // --- LANGKAH 7: Revalidate Cache ---
    console.log('[Action:Tambah] Revalidating paths...'); 
    revalidatePath('/admin/dashboard'); 
    revalidatePath('/galeri'); 
    
    // JANGAN return apa-apa di sini jika mau redirect

  } catch (err) {
    // --- TANGANI SEMUA ERROR DARI DALAM TRY ---
    console.error('[Action:Tambah] ERROR:', err); 
    
    // --- ROLLBACK: Coba hapus gambar jika sudah terupload tapi DB gagal ---
    if (fileName && publicUrl && !err.message.includes('URL publik')) { // Cek jika filename & publicUrl sudah ada
       try {
          console.log(`[Action:Tambah] Attempting rollback: Removing ${fileName}...`); 
          await supabaseAdmin.storage.from('template-images').remove([fileName]); 
          console.log(`[Action:Tambah] Rollback Success: Gambar ${fileName} dihapus.`); 
       } catch (removeError) {
          console.error(`[Action:Tambah] Rollback Gagal: Gagal hapus gambar ${fileName}`, removeError); 
       }
    }
    // --- END ROLLBACK ---

    // **PENTING:** Kembalikan object error ke client agar UI bisa update
    return { error: err.message || 'Terjadi kesalahan tidak terduga di server.' }; 
    // **JANGAN REDIRECT DI SINI**
  } // --- END CATCH ---

  // --- LANGKAH 8: REDIRECT (HANYA JIKA TIDAK ADA ERROR DI TRY) ---
  // Kode ini hanya akan jalan jika TIDAK ada error yang di-throw di dalam blok try
  console.log('[Action:Tambah] All steps successful, redirecting...'); 
  redirect('/admin/dashboard'); 
  // **TIDAK ADA RETURN SETELAH REDIRECT**
}