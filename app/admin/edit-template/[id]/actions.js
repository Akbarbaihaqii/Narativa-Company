"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function updateTemplate(formData) {
  const id = formData.get("id");
  const payload = {
    judul: formData.get("judul")?.toString().trim(),
    deskripsi: formData.get("deskripsi")?.toString().trim() || null,
    url_gambar: formData.get("url_gambar")?.toString().trim(),
    link_demo: formData.get("link_demo")?.toString().trim(),
    kategori: formData.get("kategori")?.toString().trim(),
  };

  const { error } = await supabaseAdmin.from("templates").update(payload).eq("id", id);
  if (error) return { ok: false, message: error.message };
  return { ok: true };
}
