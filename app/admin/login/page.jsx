"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginAdmin() {
  const router = useRouter();
  const supabase = createClientComponentClient(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const [checkingSession, setCheckingSession] = useState(true); 

  // --- CEK SESI AWAL (INI YANG DIPERBAIKI) ---
  useEffect(() => {
    const checkAdminSession = async () => {
      console.log("Login Page: Checking initial session...");
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        console.log("Login Page: Session found, verifying admin status...");
        try {
          // GANTI 'admins' KALO BEDA
          const { data: adminData, error: adminError } = await supabase
            .from('admins') 
            .select('id')
            // 👇 GANTI DARI 'user_id' JADI 'id' SESUAI DATABASE LO
            .eq('id', user.id) 
            .single();

          if (adminError && adminError.code !== 'PGRST116') { 
            throw adminError;
          }

          if (adminData) {
            console.log("Login Page: Active *admin* session found, redirecting...");
            localStorage.setItem('admin_id', adminData.id); 
            router.replace('/admin/dashboard');
          } else {
            console.log("Login Page: Session found, but user is not admin. Logging out.");
            await supabase.auth.signOut();
            setCheckingSession(false); 
          }
        } catch (dbError) {
          console.error("Error checking admin table:", dbError);
          await supabase.auth.signOut(); 
          setCheckingSession(false);
        }
      } else {
        console.log("Login Page: No active session found.");
        setCheckingSession(false);
      }
    };

    checkAdminSession();
  }, [supabase, router]); 


  // --- FUNGSI HANDLE LOGIN (INI YANG DIPERBAIKI) ---
  const handleLogin = async (e) => {
    e.preventDefault(); 
    setError(""); 
    setLoading(true); 

    console.log("Login Page: Attempting login with:", email); 

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError; 
      if (!data?.user) throw new Error("Login Gagal: User tidak ditemukan.");

      console.log("Login Page: Auth success. Verifying admin status...");

      // GANTI 'admins' KALO BEDA
      const { data: adminData, error: adminError } = await supabase
        .from('admins') 
        .select('id')
        // 👇 GANTI DARI 'user_id' JADI 'id' SESUAI DATABASE LO
        .eq('id', data.user.id) 
        .single();

      if (adminError && adminError.code !== 'PGRST116') { 
        throw adminError;
      }

      if (adminData) {
        console.log("Login Page: Admin verified. Redirecting to dashboard...");
        localStorage.setItem('admin_id', adminData.id); 
        router.replace("/admin/dashboard");
      } else {
        console.log("Login Page: Auth success, but user is not admin.");
        await supabase.auth.signOut(); 
        throw new Error("Login berhasil, tetapi Anda tidak terdaftar sebagai admin.");
      }

    } catch (err) {
      console.error("Login Page: Login Error Detail:", err); 
      let errorMessage = "Terjadi kesalahan saat login.";
      if (err.message.includes("Invalid login credentials")) {
          errorMessage = "Email atau password yang Anda masukkan salah.";
      } else {
          errorMessage = err.message;
      }
      setError(errorMessage); 
    } finally {
      setLoading(false); 
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
              onChange={(e) => setEmail(e.target.value)} 
              required
              placeholder="admin@example.com"
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
              disabled={loading} 
            >
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

