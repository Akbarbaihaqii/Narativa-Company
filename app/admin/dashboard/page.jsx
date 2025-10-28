"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function DashboardAdmin() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const adminId = localStorage.getItem("admin_id");
      if (!adminId) {
        router.push("/admin/login");
        return;
      }

      const { data, error } = await supabase
        .from("admins")
        .select("*")
        .eq("id", adminId)
        .single();

      if (error || !data) {
        router.push("/admin/login");
      } else {
        setAdmin(data);
      }
    };

    checkAdmin();
  }, [router]);

  if (!admin) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-3">Selamat Datang, {admin.nama}</h2>
      <p className="text-muted">Email: {admin.email}</p>

      <div className="mt-4">
        <button
          className="btn btn-success me-3"
          onClick={() => router.push("/admin/templates")}
        >
          📦 Kelola Template
        </button>

        <button
          className="btn btn-danger"
          onClick={async () => {
            await supabase.auth.signOut();
            localStorage.removeItem("admin_id");
            router.push("/admin/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
