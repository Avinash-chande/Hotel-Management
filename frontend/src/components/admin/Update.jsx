import { useEffect, useState } from "react"
import axios from "axios"
import { API } from '../../api/api.js'
import { FaEdit } from "react-icons/fa";
import AdminHero from "./adminHero.jsx";



export default function AdminMenu() {
  const [menu, setMenu] = useState([])
  const [editMenu, setEditMenu] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showHardcoded, setShowHardcoded] = useState(true)

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

  //on/off items
  const toggleHardcoded = async () => {
    const res = await axios.put(
      "http://localhost:3000/api/settings/admin/toggle-hardcoded-menu",
      {},
      { withCredentials: true }
    )
    console.log(res)

    setShowHardcoded(res.data.value)
  }


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API}/settings/show-hardcoded`)
      .then(res => setShowHardcoded(res.data.value))
  }, [])





  return (
    <>
      <AdminHero />

      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6 flex justify-center">Admin Menu</h1>

          <div className="  rounded-xl ">
            {menu.map((m) => (
              <div
                key={m._id}
                className="flex justify-between items-start border p-5 rounded-xl mb-"
              >
                <div className="w-full">
                  <h3 className="text-xl font-semibold">{m.name}</h3>

                  <div className="flex gap-2 mt-2">
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                      Unlimited
                    </span>
                    <span className="bg-green-100 px-2 py-1 rounded-full text-xs">
                      {m.status}
                    </span>
                  </div>

                  {/* ITEMS */}
                  {editMenu?._id === m._id ? (
                    <textarea
                      className="border w-full p-2 mt-3 rounded"
                      rows={4}
                      value={editMenu.items.join("\n")}
                      onChange={(e) =>
                        setEditMenu({
                          ...editMenu,
                          items: e.target.value.split("\n"),
                        })
                      }
                    />
                  ) : (
                    <ul className="mt-3 text-sm text-gray-600 space-y-1">
                      {m.items?.map((val, i) => (
                        <li key={i}>• {val}</li>
                      ))}
                    </ul>
                  )}

                  {/* BUTTONS */}
                  <div className="mt-3 flex gap-3">
                    {editMenu?._id === m._id ? (
                      <>
                        <button
                          disabled={loading}
                          onClick={updateMenu}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          {loading ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={() => setEditMenu(null)}
                          className="bg-gray-300 px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEditMenu(m)}
                        className="text-blue-600 text-sm "
                      >
                        <FaEdit className=" h-6 w-6 text-amber-500 " />
                      </button>
                    )}
                  </div>
                </div>
                <div className="text-xl font-bold text-orange-600">
                  ₹{m.price}
                </div>
              </div>
            ))}
          </div>


          {/* //ओन्ली चपाती भाजी  */}
          <div className=" mt-4">
            {menu.map((m) => (
              <div
                key={m._id}
                className="flex justify-between items-start border p-5 rounded-xl mb-4"
              >
                <div className="w-full">
                  <h3 className="text-xl font-semibold">चपाती भाजी </h3>

                  <div className="flex gap-2 mt-2">
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                      Limited
                    </span>
                    <span className="bg-green-100 px-2 py-1 rounded-full text-xs">
                      {m.status}
                    </span>
                  </div>



                  {/* ITEMS */}
                  {editMenu?._id === m._id ? (
                    <textarea
                      className="border w-full p-2 mt-3 rounded"
                      rows={4}
                      value={editMenu.items.join("\n")}
                      onChange={(e) =>
                        setEditMenu({
                          ...editMenu,
                          items: e.target.value.split("\n"),
                        })
                      }
                    />
                  ) : (

                    <ul className="mt-3 text-sm text-gray-600 space-y-1">
                      {m.items?.map((val, i) => (
                        <li key={i}>• {val}</li>
                      ))}
                    </ul>
                  )}
                  <ul className="mt-1 text-sm text-gray-600 space-y-1">
                    <li>•3 चपाती </li>
                  </ul>
                  {/* BUTTONS */}
                  <div className="mt-3 flex gap-3">
                    {editMenu?._id === m._id ? (
                      <>
                        <button
                          disabled={loading}
                          onClick={updateMenu}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          {loading ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={() => setEditMenu(null)}
                          className="bg-gray-300 px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEditMenu(m)}
                        className="text-blue-600 text-sm "
                      >
                        <FaEdit className=" h-6 w-6   text-amber-500 " />
                      </button>
                    )}
                  </div>
                </div>
                <div className="text-xl font-bold text-orange-600">
                  ₹60
                </div>
              </div>
            ))}
          </div>


        </div>


      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="bg-white rounded-2xl shadow-lg p-6">


          <div className="border rounded-xl p-5 mb-4 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  चिकन थाळी
                </h3>

                {/*
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-sm">
                    ⭐
                  </span>
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  ⭐ 4.9 · 7 ratings
                </p>
                 */ }

                <div className="flex gap-2 mt-2">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    Unlimited
                  </span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    Available
                  </span>
                </div>

                <ul className="mt-3 text-sm text-gray-600 space-y-1">
                  <li>• चिकन 4 piece</li>
                  <li>• चपाती / भाकरी Unlimited</li>
                  <li>• राईस Unlimited</li>
                  <li>• रस्सा Unlimited</li>
                </ul>
              </div>

              <button
                onClick={toggleHardcoded}
                className="bg-green-500 text-white px-4 py-1 rounded"
              >
                {showHardcoded ? "Hide on Home" : "Show on Home"}
              </button>

              <div className="text-xl font-bold text-orange-600">
                ₹150
              </div>
            </div >
          </div >









        </div >
      </div >



    </>

  )
}
