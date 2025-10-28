export const dynamic = "force-dynamic";
export const revalidate = 0;

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import EditForm from "./EditForm";

async function getTemplate(id) {
  const { data, error } = await supabaseAdmin.from("templates").select("*").eq("id", id).single();
  if (error || !data) return null;
  return data;
}

export default async function Page({ params }) {
  const tmpl = await getTemplate(params.id);
  if (!tmpl) {
    return (
      <main className="container py-5">
        <div className="alert alert-warning">Template tidak ditemukan.</div>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <h3 className="fw-bold mb-4">Edit Template</h3>
      <EditForm tmpl={tmpl} />
    </main>
  );
}
