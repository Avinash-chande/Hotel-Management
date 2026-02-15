import { useEffect, useState } from "react"
import axios from "axios"
import { API } from '../../api/api.js'
import { FaEdit } from "react-icons/fa";
import AdminHero from "./AdminHero";
import { motion } from "framer-motion";
import Footer from "../admin/footer/Footer.jsx";



export default function AdminMenu() {
  const [menu, setMenu] = useState([])
  const [editMenu, setEditMenu] = useState(null)
  const [loading, setLoading] = useState(false)
  const [regularMenu, setRegularMenu] = useState([])

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

  const fetchRegularMenu = async () => {
    try {
      const res = await axios.get(`${API}/regular-menu`)
      setRegularMenu(res.data.data) //  ONLY ARRAY`
      // console.log(res.data)
    } catch (err) {
      console.log(err)
    } ``
  }

  const toggleVisibility = async (menuItem) => {
    // 1️ Optimistically update UI
    setRegularMenu(prev =>
      prev.map(item =>
        item._id === menuItem._id
          ? { ...item, isVisible: !item.isVisible }
          : item
      )
    )

    try {
      // 2️ Update backend
      await axios.patch(
        `${API}/regular-menu/toggle-visibility/${menuItem._id}`,
        { isVisible: !menuItem.isVisible },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
    } catch (err) {
      console.log("Toggle failed, reverting", err)

      // 3️ Revert UI if API fails
      setRegularMenu(prev =>
        prev.map(item =>
          item._id === menuItem._id
            ? { ...item, isVisible: menuItem.isVisible }
            : item
        )
      )
    }
  }


  useEffect(() => {
    fetchMenu()
    fetchRegularMenu()
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
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >

        <div className="bg-[#F5F2EB]">
          <AdminHero />


          <div className="max-w-7xl  mt-6 mx-auto px-4   bg-[#F5F2EB] ">
            <div className="text-center m-5 ">
              <h1 className="text-3xl font-bold font-merienda ">Today&apos;s Menu</h1>
              <h4 className="text-gray-500  font-poppins">
                Freshly prepared dishes with authentic flavors
              </h4>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 ">


              {/* SINGLE CARD */}
              <div className="rounded-xl ">

                {menu
                  .filter(m => m.isVisible)   //  IMPORTANT (from DB)
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



          {/* Regular  Fiexd menu section */}
          <div>
            <div className="max-w-7xl mx-auto px-4 mt-10 ">
              <div className="text-center m-5">
                <h1 className="text-3xl font-bold font-merienda ">Regular Thali Specials</h1>
                <h4 className="text-gray-500  font-poppins">
                  Fresh, filling, and satisfying meals
                </h4>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 ">

                {/* SINGLE CARD */}
                <div className="rounded-xl ">

                  {regularMenu
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

                            <ul className="mt-3 text-sm text-gray-600 space-y-1 italic">
                              {m.items?.map((val, i) => (
                                <li key={i}>• {val}</li>
                              ))}
                            </ul>
                          </div>

                          {/* RIGHT */}
                          <div className="flex items-center gap-4">
                            {/* TOGGLE VISIBILITY */}
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={m.isVisible}
                                onChange={() => toggleVisibility(m)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500
                                   after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                                   after:bg-white after:h-5 after:w-5 after:rounded-full
                                   after:transition-all peer-checked:after:translate-x-full relative">
                              </div>
                            </label>
                            {/* PRICE */}
                            <span className="text-lg font-semibold text-orange-600">
                              ₹{m.price}
                            </span>
                          </div>
                        </div>
                        {/* DIVIDER */}
                        {index !== regularMenu.length - 1 && (
                          <hr className="border-gray-200" />
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>

      </motion.div>
    </>

  )
}















