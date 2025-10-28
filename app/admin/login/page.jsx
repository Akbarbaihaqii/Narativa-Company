"use client"; // Pastikan ini di baris paling atas
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// 👇 IMPORT HELPER YANG BENAR UNTUK CLIENT COMPONENT NEXT.JS
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginAdmin() {
  const router = useRouter();
  // 👇 BUAT KLIEN SUPABASE PAKAI HELPER DI DALAM KOMPONEN
  const supabase = createClientComponentClient(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true); // Untuk loading awal

  // --- CEK SESI AWAL ---
  // Cek apakah user sudah login sebelumnya (pakai cookie)
  useEffect(() => {
    const checkSession = async () => {
      console.log("Login Page: Checking initial session...");
      try {
          // Gunakan getSession() dari helper client
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          if (sessionError) throw sessionError; // Lempar error jika gagal cek sesi

          if (session) {
            console.log("Login Page: Active session found via cookie, redirecting...");
            // Jika ada sesi cookie valid, langsung lempar ke dashboard
            router.replace('/admin/dashboard'); 
          } else {
             console.log("Login Page: No active session found via cookie.");
             // Biarkan form login tampil jika tidak ada sesi
             setCheckingSession(false); // Selesai cek, tampilkan form
          }
      } catch (err) {
          console.error("Login Page: Error checking session:", err);
          setError("Gagal memeriksa sesi login. Coba refresh halaman."); // Tampilkan error
          setCheckingSession(false); // Tetap tampilkan form walau error
      } 
      // Loading selesai hanya jika tidak ada sesi atau error
    };

    checkSession();
  }, [supabase, router]); // Dependensi: jalankan saat supabase/router berubah (sekali mount)


  // --- FUNGSI HANDLE LOGIN ---
  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setError(""); // Reset error setiap kali coba login
    setLoading(true); // Mulai loading

    console.log("Login Page: Attempting login with:", email); 

    try {
      // Login pakai signInWithPassword dari helper client
      // 👇 INI AKAN OTOMATIS MENGATUR COOKIE SESI JIKA BERHASIL
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Login Page: signInWithPassword result:", { data, signInError }); 

      // Jika Supabase mengembalikan error (misal password salah)
      if (signInError) {
        throw new Error(signInError.message || "Email atau password salah."); 
      }
      
      // Jika tidak ada data user setelah login (seharusnya tidak terjadi jika tidak error)
      if (!data?.user) {
        throw new Error("Login Gagal: Tidak ada data user yang diterima setelah login.");
      }

      console.log("Login Page: Login Berhasil via Auth Helpers! User:", data.user.email); 

      // === PENTING: HAPUS LOGIKA LAMA ===
      // ❌ TIDAK PERLU CEK TABEL 'admins' LAGI DI SINI. 
      //    Supabase Auth sudah cukup. Siapa pun yang bisa login dianggap admin.
      //    Jika *perlu* role, aturnya di Supabase RLS atau Custom Claims.
      // ❌ TIDAK PERLU SIMPAN APA PUN DI localStorage ('admin_id', 'isAdminLoggedIn').
      //    Auth Helpers sudah menyimpan sesi di COOKIE.
      // === END HAPUS LOGIKA LAMA ===

      // Redirect ke dashboard admin setelah login berhasil
      console.log("Login Page: Redirecting to dashboard..."); 
      // Pakai replace agar user tidak bisa klik "Back" ke halaman login
      router.replace("/admin/dashboard"); 
      // Opsional: refresh untuk memastikan data server component terbaru (jika perlu)
      // router.refresh(); 

    } catch (err) {
      // Tangani semua error (password salah, user tidak ada, dll)
      console.error("Login Page: Login Error Detail:", err); 
      let errorMessage = "Terjadi kesalahan saat login.";
      // Pesan error spesifik untuk kredensial salah
      if (err.message.includes("Invalid login credentials")) {
          errorMessage = "Email atau password yang Anda masukkan salah.";
      } else if (err.message) {
          // Tampilkan pesan error lain dari Supabase/sistem
          errorMessage = err.message;
      }
      setError(errorMessage); // Set state error untuk ditampilkan di UI
    } finally {
      setLoading(false); // Selalu set loading false setelah selesai (baik sukses/gagal)
    }
  };

  // Tampilkan loading saat cek sesi awal
  if (checkingSession) {
     return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
           <div className="spinner-border text-primary" role="status">
             <span className="visually-hidden">Loading...</span>
           </div>
           <p className="ms-2 text-muted">Memeriksa sesi...</p>
        </div>
     );
  }

  // Tampilan form login (setelah cek sesi selesai & tidak ada sesi aktif)
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "400px", borderRadius: '15px' }}>
        <h3 className="text-center mb-4 fw-bold text-primary">Login Admin Narativa</h3>
        
        {/* Tampilkan Error jika ada */}
        {error && (
          <div className="alert alert-danger text-center small p-2" role="alert"> 
             {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
           <div className="mb-3">
            <label htmlFor="loginEmail" className="form-label">Email</label>
            <input
              id="loginEmail" 
              type="email"
              className="form-control"
              value={email}
              // Update state saat user mengetik
              onChange={(e) => setEmail(e.target.value)} 
              required
              placeholder="admin@example.com"
              // Disable input saat loading
              disabled={loading} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="loginPassword" >Password</label>
            <input
              id="loginPassword" 
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary w-100 fw-bold" 
            // Disable tombol saat loading
            disabled={loading} 
          >
            {/* Tampilkan teks/spinner berdasarkan state loading */}
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Memproses...
              </>
            ) : (
              'Masuk'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}