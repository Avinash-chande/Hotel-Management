import { useEffect, useState } from "react"
import axios from "axios"
import { API } from '../../api/api.js'
import { FaEdit } from "react-icons/fa";
import AdminHero from "./adminHero.jsx";



export default function AdminMenu() {
  const [menu, setMenu] = useState([])
  const [editMenu, setEditMenu] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState("")


  // ====

  const fetchMenu = async () => {
    try {
      const res = await axios.get(`${API}/menu`)
      setMenu(res.data.data) //  ONLY ARRAY
      // console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchMenu()
  }, [])

  // ==

  const token = localStorage.getItem("accessToken")

  const updateMenu = async () => {
    try {
      setLoading(true)
      await axios.put(`${API}/menu/${editMenu._id}`, {
        items: editMenu.items,
        name: editMenu.name,
        price: editMenu.price,
        status: editMenu.status,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      setEditMenu(null)
      fetchMenu()
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    document.body.style.overflow = editMenu ? "hidden" : "auto"
  }, [editMenu])



  return (
    <>
      <AdminHero />

      <div>
        <div className="max-w-7xl mx-auto px-4 mt-10 ">
          <div className="bg-white rounded-2xl shadow-lg p-6 ">

            {/* SINGLE CARD */}
            <div className="rounded-xl ">

              {menu
                .filter(m => m.isVisible)   // 🔥 IMPORTANT (from DB)
                .map((m, index) => (
                  <div key={m._id}>

                    {/* MENU ITEM ROW */}
                    <div className="flex justify-between items-start py-4 border rounded-xl p-5 mb-4 hover:shadow-md transition">

                      {/* LEFT */}
                      <div className="w-full">
                        <h3 className="text-lg font-semibold">{m.name}</h3>

                        <div className="flex gap-2 mt-2">
                          <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                            {m.portionType === "unlimited" ? "Unlimited" : "Limited"}
                          </span>
                          <span className="bg-[#FA954C] text-white  font-bold px-2 py-0.5 rounded-full text-xs capitalize ">
                            {m.status === "available" ? "✅Available" : "Not Available"}
                          </span>
                        </div>

                        <ul className="mt-3 text-sm text-gray-600 space-y-1">
                          {m.items?.map((val, i) => (
                            <li key={i}>• {val}</li>
                          ))}
                        </ul>
                      </div>

                      {editMenu && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">

                          {/* BLURRED BACKGROUND */}
                          <div
                            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                            onClick={() => setEditMenu(null)}
                          />

                          {/* CENTER CONTENT */}
                          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-xl p-6 z-10">

                            <h3 className="text-lg font-bold mb-4">
                              Edit Menu
                            </h3>
                            {/* ITEMS INPUTS */}
                            <div className="space-y-3 ">
                              {editMenu.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">

                                  <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => {
                                      const updatedItems = [...editMenu.items]
                                      updatedItems[index] = e.target.value

                                      setEditMenu({
                                        ...editMenu,
                                        items: updatedItems,
                                      })
                                    }}
                                    className="border w-full p-2 rounded"
                                  />

                                  {/* REMOVE BUTTON */}
                                  <button
                                    onClick={() => {
                                      const updatedItems = editMenu.items.filter((_, i) => i !== index)
                                      setEditMenu({ ...editMenu, items: updatedItems })
                                    }}
                                    className="text-xl hover:scale-110 transition"
                                    title="Remove item"
                                  >
                                    ❌
                                  </button>
                                </div>
                              ))}
                            </div>

                            <button
                              onClick={() =>
                                setEditMenu({
                                  ...editMenu,
                                  items: [...editMenu.items, ""],
                                })
                              }
                              className="mt-3 text-sm font-extrabold text-[#7E59D0]"
                            >
                              ➕ Add Item
                            </button>




                            <div className="mt-4 flex justify-end gap-3">
                              <button
                                onClick={() => setEditMenu(null)}
                                className="bg-gray-300 px-4 py-2 rounded font-bold"
                              >
                                Cancel
                              </button>

                              <button
                                onClick={updateMenu}
                                className="bg-green-500 text-white px-4 py-2 rounded font-bold"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      )}


                      {/* RIGHT */}
                      <div className="flex items-center gap-3">
                        {/* EDIT ICON */}
                        <button
                          onClick={() => setEditMenu(m)}
                          className="text-amber-500 hover:scale-110 transition"
                        >
                          <FaEdit className="h-6 w-6" />
                        </button>

                        {/* PRICE */}
                        <span className="text-lg font-semibold text-orange-600">
                          ₹{m.price}
                        </span>
                      </div>

                    </div>

                    {/* DIVIDER */}
                    {index !== menu.length - 1 && (
                      <hr className="border-gray-200" />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>


    </>

  )
}















