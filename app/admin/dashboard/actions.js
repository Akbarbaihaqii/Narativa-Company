'use server' // <-- WAJIB ADA

// Import Klien Admin (yang pakai Kunci Rahasia)
import { supabaseAdmin } from '@/lib/supabaseAdmin' 
// Untuk update cache halaman setelah data berubah
import { revalidatePath } from 'next/cache' 
// Untuk cek sesi login di server action
import { cookies } from 'next/headers' 
import { createServerActionClient } from '@supabase/auth-helpers-nextjs' 

// Fungsi Server Action untuk Hapus Template
export async function deleteTemplateAction(template) {
  
  // 1. Cek otentikasi admin di server (WAJIB!)
  const supabaseAuth = createServerActionClient({ cookies }) 
  const { data: { session }, error: sessionError } = await supabaseAuth.auth.getSession()
  // Jika error ambil sesi atau tidak ada sesi (belum login)
  if (sessionError || !session) {
    console.error('[Action:Delete] Auth Error:', sessionError?.message || 'No active session');
    // Kembalikan error ke client
    return { error: 'Akses ditolak. Sesi tidak valid atau Anda belum login.' } 
  }
  console.log(`[Action:Delete] User ${session.user.email} authenticated.`);

  // 2. Validasi data 'template' yang diterima dari client
  if (!template || !template.id || !template.url_gambar) {
    console.warn('[Action:Delete] Invalid template data received:', template);
    return { error: 'Data template tidak lengkap untuk dihapus.' }
  }
  console.log(`[Action:Delete] Attempting to delete template ID: ${template.id}`);

  try {
    // 3. Ambil nama file gambar dari URL
    // Contoh URL: https://hxqoqemezfygueswsqgn.supabase.co/storage/v1/object/public/template-images/176147...-namafile.png
    // Kita butuh bagian terakhir: 176147...-namafile.png
    const fileName = template.url_gambar.substring(template.url_gambar.lastIndexOf('/') + 1);
    // Tambah validasi sederhana untuk nama file
    if (!fileName || fileName.length < 5) { 
        console.warn(`[Action:Delete] Invalid filename derived: ${fileName} from URL: ${template.url_gambar}`);
        // Kita bisa pilih untuk tetap lanjut hapus DB saja, atau gagalkan
        // throw new Error('Format URL gambar tidak valid.'); // Opsi gagalkan
        console.log('[Action:Delete] Proceeding with DB delete despite potentially invalid filename.'); // Opsi lanjut
    } else {
       console.log(`[Action:Delete] Derived filename: ${fileName}`);
    }

    // 4. Hapus data dari tabel 'templates' (pakai Kunci Admin)
    console.log(`[Action:Delete] Deleting DB record for ID: ${template.id}`);
    const { error: dbError } = await supabaseAdmin
      .from('templates') // Pastikan nama tabel benar
      .delete()
      .eq('id', template.id) // Targetkan ID yang benar

    // Jika GAGAL hapus dari DB, lempar error (jangan lanjut hapus gambar)
    if (dbError) {
      console.error('[Action:Delete] DB Delete Error:', dbError);
      throw new Error(`Gagal menghapus data template: ${dbError.message}`);
    }
    console.log(`[Action:Delete] DB record deleted successfully.`);

    // 5. Hapus file gambar dari Supabase Storage (pakai Kunci Admin)
    // Hanya jika fileName valid
    if (fileName && fileName.length >= 5) {
        console.log(`[Action:Delete] Deleting storage object: ${fileName}`);
        const { error: storageError } = await supabaseAdmin.storage
          .from('template-images') // Pastikan nama bucket benar
          .remove([fileName]) // Kirim nama file dalam array
        
        // Abaikan error "not found" (mungkin sudah terhapus/URL salah), tapi log error lain
        if (storageError && storageError.message !== 'The resource was not found') {
           console.warn('[Action:Delete] Storage Delete Warning:', storageError.message) 
           // Anda bisa pilih mau kembalikan error ini ke client atau tidak
           // return { error: 'Data DB terhapus, tapi gagal hapus gambar: ' + storageError.message };
        } else if (storageError) {
            console.log('[Action:Delete] Storage object not found (normal if URL was incorrect or already deleted).');
        } else {
            console.log(`[Action:Delete] Storage object deleted successfully.`);
        }
    } else {
        console.log('[Action:Delete] Skipping storage delete due to invalid filename.');
    }

    // --- JIKA BERHASIL SAMPAI SINI ---
    
    // 6. Update cache Next.js agar data baru tampil
    console.log('[Action:Delete] Revalidating paths...');
    revalidatePath('/admin/dashboard') // Update halaman dashboard
    revalidatePath('/galeri') // Update halaman galeri publik
    
    console.log('[Action:Delete] Delete process successful.');
    // 7. Kembalikan status sukses ke client
    return { success: true }

  } catch (err) {
    // Tangani semua error yang terjadi di dalam try
    console.error('[Action:Delete] FATAL ERROR:', err)
    // Kembalikan pesan error ke client
    return { error: err.message || 'Terjadi kesalahan sistem saat menghapus.' }
  }
}