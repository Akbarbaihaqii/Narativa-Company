
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function Page(){
  const router = useRouter()
  useEffect(()=>{ supabase.auth.signOut().then(()=> router.push('/admin')) },[router])
  return <div className="container py-5"><p>Logging out...</p></div>
}
