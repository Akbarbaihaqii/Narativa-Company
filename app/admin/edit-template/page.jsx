
"use client";
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function Page(){
  const router = useRouter()
  const params = useSearchParams()
  const id = params.get('id')
  const [form,setForm]=useState({judul:'',deskripsi:'',url_gambar:'',link_demo:'',kategori:''})

  useEffect(()=>{
    (async()=>{
      const { data:{user} } = await supabase.auth.getUser()
      if(!user){ router.push('/admin'); return }
      if(id){
        const { data } = await supabase.from('templates').select('*').eq('id', id).single()
        if(data) setForm(data)
      }
    })()
  },[id, router])

  const onSubmit=async(e)=>{
    e.preventDefault()
    await supabase.from('templates').update(form).eq('id', id)
    router.push('/admin/dashboard')
  }

  return (
    <div className="container admin-page-container">
      <div className="admin-card">
        <h3 className="fw-bold mb-3">Edit Template</h3>
        <form onSubmit={onSubmit} className="admin-form">
          {['judul','deskripsi','url_gambar','link_demo','kategori'].map((k)=>(
            <div className="mb-3" key={k}><label className="form-label">{k.replace('_',' ').toUpperCase()}</label><input className="form-control" value={form[k]||''} onChange={e=>setForm({...form,[k]:e.target.value})}/></div>
          ))}
          <button className="btn btn-submit">Update</button>
        </form>
      </div>
    </div>
  )
}
