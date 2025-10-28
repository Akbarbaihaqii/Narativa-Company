'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function TambahTemplatePage() {
  const router = useRouter()
  const [judul, setJudul] = useState('')
  const [kategori, setKategori] = useState('')
  const [linkDemo, setLinkDemo] = useState('')
  const [gambar, setGambar] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const admin = localStorage.getItem('admin')
    if (!admin) router.push('/admin')
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!judul || !kategori || !linkDemo || !gambar) {
      alert('Semua kolom wajib diisi, termasuk gambar!')
      return
    }

    setLoading(true)

    // Upload gambar ke Supabase Storage
    const fileName = `${Date.now()}-${gambar.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('template-images')
      .upload(fileName, gambar)

    if (uploadError) {
      alert('Gagal upload gambar: ' + uploadError.message)
      setLoading(false)
      return
    }

    // Ambil URL publik gambar
    const { data: publicUrl } = supabase.storage
      .from('template-images')
      .getPublicUrl(fileName)

    // Simpan data ke tabel templates
    const { error } = await supabase.from('templates').insert([
      {
        judul,
        kategori,
        link_demo: linkDemo,
        url_gambar: publicUrl.publicUrl,
        dibuat_pada: new Date().toISOString(),
      },
    ])

    setLoading(false)

    if (error) {
      alert('Gagal menambahkan template: ' + error.message)
      console.error(error)
    } else {
      alert('Template berhasil ditambahkan!')
      router.push('/admin/dashboard')
    }
  }

  return (
    <main className="container py-5">
      <h2 className="fw-bold mb-4">Tambah Template Baru</h2>

      <form onSubmit={handleSubmit} className="col-lg-6 mx-auto">
        <div className="mb-3">
          <label className="form-label">Judul Template</label>
          <input
            type="text"
            className="form-control"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Kategori</label>
          <input
            type="text"
            className="form-control"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Link Demo</label>
          <input
            type="url"
            className="form-control"
            value={linkDemo}
            onChange={(e) => setLinkDemo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Gambar Template</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setGambar(e.target.files[0])}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : 'Simpan Template'}
        </button>
      </form>
    </main>
  )
}
