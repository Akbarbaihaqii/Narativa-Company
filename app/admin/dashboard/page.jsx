// Import helper Supabase dan Next.js
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Import Klien Admin dan Komponen Client
// Path diubah, mundur 3 kali ke root project
// baru masuk ke /lib/
import { supabaseAdmin } from '../../../lib/supabaseAdmin';
import DashboardClient from './DashboardClient';

// export const dynamic = 'force-dynamic' // Aktifkan jika butuh data real-time
export const revalidate = 0; // Cara lain agar data selalu fresh (fetch ulang tiap request)

export default async function DashboardPage() {
  

  
  // --- CEK SESI LOGIN DI SERVER ---
  const supabaseAuth = createServerComponentClient({ cookies }); 
  
  let session = null;
  let adminEmail = null;
  let sessionError = null;

  try {
    // Coba ambil sesi dari cookie
    const { data: sessionData, error } = await supabaseAuth.auth.getSession();
    if (error) throw error; // Lempar error jika gagal
    
    session = sessionData.session; 
    adminEmail = session?.user?.email; // Ambil email jika sesi ada
    
    console.log("[DashboardPage] Session Check:", session ? `Valid (${adminEmail})` : "No session");
  
  } catch (error) {
    sessionError = error.message;
    console.error("[DashboardPage] Session Error:", sessionError);
    // Redirect ke login jika gagal ambil sesi
    redirect(`/admin/login?error=Session%20check%20failed:%20${encodeURIComponent(sessionError)}`); 
  }

  // Jika tidak ada sesi (belum login), redirect ke login
  if (!session) {
    console.log("[DashboardPage] Redirecting to login (no session).");
    redirect('/admin/login');
  }
  // --- END CEK SESI ---

  
  // --- FETCH DATA TEMPLATES (pakai Kunci Admin) ---
  let templates = [];
  let fetchError = null;
  
  try {
    console.log("[DashboardPage] Fetching templates using admin client...");
    
    // Query ke Supabase pakai klien admin
    const { data, error } = await supabaseAdmin 
      .from('templates') // Pastikan nama tabel benar
      .select('*') // Ambil semua kolom
      .order('dibuat_pada', { ascending: false }); // Urutkan terbaru di atas
      
    if (error) throw error; // Lempar error jika fetch gagal
    
    templates = data || []; // Pastikan 'templates' selalu array
    console.log(`[DashboardPage] Fetched ${templates.length} templates successfully.`);
  
  } catch (error) {
     console.error("[DashboardPage] Failed to fetch templates:", error.message);
     fetchError = error.message; // Simpan pesan error
  }
  // --- END FETCH DATA ---
  
  
  // --- RENDER CLIENT COMPONENT ---
  // Render komponen Client, lempar data awal dan email admin
  console.log("[DashboardPage] Rendering DashboardClient...");
  
  return (
    <DashboardClient 
      // Kirim array kosong jika fetch error, agar client tidak crash
      initialTemplates={fetchError ? [] : templates} 
      adminEmail={adminEmail} 
      // Anda bisa lempar error fetch ke client jika ingin menampilkannya:
      // fetchError={fetchError} 
    />
  );
}


