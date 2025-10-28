"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// Ganti ENV sesuai proyek kamu
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginAdmin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1️⃣ Login ke Supabase Auth
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;

      const userId = data?.user?.id;
      if (!userId) throw new Error("Gagal mengambil ID user");

      // 2️⃣ Cek apakah user ini admin
      const { data: adminData, error: adminError } = await supabase
        .from("admins")
        .select("*")
        .eq("id", userId)
        .single();

      if (adminError || !adminData) {
        throw new Error("Akses ditolak! Kamu bukan admin.");
      }

      // 3️⃣ Simpan sesi login (opsional: localStorage)
      localStorage.setItem("admin_id", userId);

      // 4️⃣ Redirect ke dashboard admin
      router.push("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h3 className="text-center mb-3 fw-bold">Login Admin</h3>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
