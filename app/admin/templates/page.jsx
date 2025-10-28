"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function TemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTemplates = async () => {
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .order("dibuat_pada", { ascending: false });
    if (!error) setTemplates(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus template ini?")) return;
    await supabase.from("templates").delete().eq("id", id);
    fetchTemplates();
  };

  if (loading) return <p className="text-center mt-5">Memuat...</p>;

  return (
    <div className="container mt-5">
      <h3 className="fw-bold mb-3">Kelola Template</h3>

      <button
        className="btn btn-primary mb-3"
        onClick={() => router.push("/admin/templates/new")}
      >
        ➕ Tambah Template
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Kategori</th>
            <th>Link Demo</th>
            <th>Gambar</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {templates.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                Belum ada template.
              </td>
            </tr>
          )}
          {templates.map((t) => (
            <tr key={t.id}>
              <td>{t.judul}</td>
              <td>{t.kategori}</td>
              <td>
                <a href={t.link_demo} target="_blank">
                  Lihat
                </a>
              </td>
              <td>
                <img
                  src={t.url_gambar || "/assets/images/mockup.png"}
                  width="80"
                  className="rounded"
                />
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => router.push(`/admin/templates/edit/${t.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(t.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
