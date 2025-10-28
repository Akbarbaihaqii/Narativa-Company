
# Narativa Next.js + Supabase (Full)

## Setup Cepat
1. `npm install`
2. Copy `.env.local.example` → `.env.local` dan isi:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. `npm run dev` → buka http://localhost:3000

## Halaman
- `/` : Landing (identik, ganti CSS dengan file style.css lama untuk 100%)  
- `/galeri` : Ambil data dari tabel `templates`  
- `/kontak` : Placeholder (EmailJS nanti)  
- `/tentang` : Tentang  
- `/admin` : Login (Supabase Auth)  
- `/admin/register` : Register  
- `/admin/dashboard` : CRUD `templates`  
- `/admin/tambah-template`, `/admin/edit-template`, `/admin/hapus-template`

## Catatan
- Ganti `public/assets/css/style.css` dengan **style.css** PHP lama kamu supaya tampilan identik.
- Ganti juga placeholder gambar di `public/assets/images/` dengan aset asli kamu.
