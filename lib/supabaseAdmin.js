import { createClient } from '@supabase/supabase-js';

// Klien ini HANYA boleh dipakai di sisi server (Server Components / API Routes)
// Dia mengambil URL dari env, tapi kuncinya pakai SERVICE_ROLE_KEY
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
    },
  }
);
