import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { updateMenu } from "../../api/api"

export default function EditMenu(){
  const {id} = useParams()
  const nav = useNavigate()

  const [form,setForm] = useState({
    name:"", price:"", status:"available"
  })

  useEffect(()=>{
    fetch("http://localhost:5000/api/menu")
      .then(res=>res.json())
      .then(data=>{
        const m = data.find(i=>i._id===id)
        setForm(m)
      })
  },[])

  const update=async(e)=>{
    e.preventDefault()
    await updateMenu(id,form)
    nav("/admin/menu")
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded-xl">
      <h3 className="text-xl font-bold mb-4">Edit Menu</h3>

      <form onSubmit={update} className="space-y-4">
        <input
          value={form.name}
          className="w-full border p-2 rounded"
          onChange={e=>setForm({...form,name:e.target.value})}
        />

        <input
          value={form.price}
          className="w-full border p-2 rounded"
          onChange={e=>setForm({...form,price:e.target.value})}
        />

        <select
          value={form.status}
          className="w-full border p-2 rounded"
          onChange={e=>setForm({...form,status:e.target.value})}
        >
          <option>available</option>
          <option>limited</option>
          <option>unavailable</option>
        </select>

        <button
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
          Update Menu
        </button>
      </form>
    </div>
  )
}
