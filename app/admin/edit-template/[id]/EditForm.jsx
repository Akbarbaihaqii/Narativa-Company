"use client";

import { useRouter } from "next/navigation";
import { updateTemplate } from "./actions";
import { useEffect } from "react";

export default function EditForm({ tmpl }) {
  const router = useRouter();

  useEffect(() => {
    const adm = localStorage.getItem("admin_id");
    if (!adm) router.push("/admin/login");
  }, [router]);

  return (
    <form action={async (fd) => {
      const res = await updateTemplate(fd);
      if (res.ok) router.push("/admin/dashboard");
      else alert(res.message);
    }} className="admin-form">
      <input type="hidden" name="id" defaultValue={tmpl.id} />

      <div className="mb-3">
        <label className="form-label">Judul</label>
        <input name="judul" className="form-control" defaultValue={tmpl.judul} required/>
      </div>

      <div className="mb-3">
        <label className="form-label">Deskripsi</label>
        <textarea name="deskripsi" className="form-control" rows={4} defaultValue={tmpl.deskripsi || ""}/>
      </div>

      <div className="mb-3">
        <label className="form-label">URL Gambar</label>
        <input name="url_gambar" className="form-control" defaultValue={tmpl.url_gambar || ""} required/>
      </div>

      <div className="mb-3">
        <label className="form-label">Link Demo</label>
        <input name="link_demo" className="form-control" defaultValue={tmpl.link_demo || ""} required/>
      </div>

      <div className="mb-4">
        <label className="form-label">Kategori</label>
        <input name="kategori" className="form-control" defaultValue={tmpl.kategori || ""} required/>
      </div>

      <button className="btn btn-primary">Update</button>
    </form>
  );
}
