"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function NewTemplatePage() {
  const router = useRouter();
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [linkDemo, setLinkDemo] = useState("");
  const [kategori, setKategori] = useState("");
  const [gambar, setGambar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const handleUpload = async (file) => {
  if (!file) return null;
  const fileName = `${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("template-images") // ✅ gunakan nama bucket yang sesuai
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from("template-images") // ✅ sama di sini juga
    .getPublicUrl(fileName);

  return data.publicUrl;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let imageUrl = null;
      if (gambar) {
        imageUrl = await handleUpload(gambar);
      }

      const { error: insertError } = await supabase.from("templates").insert([
        {
          judul,
          deskripsi,
          url_gambar: imageUrl,
          link_demo: linkDemo,
          kategori,
          dibuat_pada: new Date(),
        },
      ]);

      if (insertError) throw insertError;
      router.push("/admin/templates");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="fw-bold mb-3">Tambah Template</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Judul</label>
          <input
            type="text"
            className="form-control"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
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
          <label className="form-label">Upload Gambar</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) => setGambar(e.target.files[0])}
            required
          />
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

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
