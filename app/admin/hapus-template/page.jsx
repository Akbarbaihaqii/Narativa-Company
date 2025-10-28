
'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function Page(){
  const router = useRouter()
  const params = useSearchParams()
  const id = params.get('id')
  useEffect(()=>{
    (async()=>{
      const { data:{user} } = await supabase.auth.getUser()
      if(!user){ router.push('/admin'); return }
      if(id){ await supabase.from('templates').delete().eq('id', id) }
      router.push('/admin/dashboard')
    })()
  },[id, router])
  return <div className="container py-5"><p>Menghapus...</p></div>
}
