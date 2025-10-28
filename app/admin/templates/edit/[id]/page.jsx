"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function EditTemplatePage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState(null);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [urlGambar, setUrlGambar] = useState("");
  const [linkDemo, setLinkDemo] = useState("");
  const [kategori, setKategori] = useState("");
  const [error, setError] = useState("");

  // 🔹 Ambil data berdasarkan ID
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("templates")
        .select("*")
        .eq("id", id)
        .single();
      if (error) setError(error.message);
      else {
        setTemplate(data);
        setJudul(data.judul);
        setDeskripsi(data.deskripsi);
        setUrlGambar(data.url_gambar);
        setLinkDemo(data.link_demo);
        setKategori(data.kategori);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  // 🔹 Update data
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase
      .from("templates")
      .update({
        judul,
        deskripsi,
        url_gambar: urlGambar,
        link_demo: linkDemo,
        kategori,
      })
      .eq("id", id);

    if (error) setError(error.message);
    else router.push("/admin/templates");
  };

  if (loading) return <div className="text-center mt-5">Memuat data...</div>;
  if (!template) return <div className="text-center mt-5 text-danger">Data tidak ditemukan.</div>;

  return (
    <div className="container mt-5">
      <h3 className="fw-bold mb-3">Edit Template</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Judul</label>
          <input
            type="text"
            className="form-control"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Deskripsi</label>
          <textarea
            className="form-control"
            rows="3"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">URL Gambar</label>
          <input
            type="text"
            className="form-control"
            value={urlGambar}
            onChange={(e) => setUrlGambar(e.target.value)}
            placeholder="https://..."
          />
          <div className="mt-2">
            {urlGambar && (
              <img
                src={urlGambar}
                alt="Preview"
                style={{ width: "150px", borderRadius: "8px" }}
              />
            )}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Link Demo</label>
          <input
            type="text"
            className="form-control"
            value={linkDemo}
            onChange={(e) => setLinkDemo(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Kategori</label>
          <input
            type="text"
            className="form-control"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          Simpan Perubahan
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => router.push("/admin/templates")}
        >
          Batal
        </button>
      </form>
    </div>
  );
}
