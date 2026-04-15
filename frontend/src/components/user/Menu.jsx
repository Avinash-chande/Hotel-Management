import React from 'react'
import { useEffect, useState } from "react"
import axios from "axios"
import { API } from '../../api/api.js'

function Menu() {
    const [menu, setMenu] = useState([])
    const [regularMenu, setRegularMenu] = useState([])


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
            setRegularMenu(res.data.data) //  ONLY ARRAY
            // console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchMenu()
        fetchRegularMenu()
    }, [])
    return (
        <>
            {/* daliy menu section */}
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

                                                <ul className="mt-3 text-sm text-gray-600 space-y-1 italic">
                                                    {m.items?.map((val, i) => (
                                                        <li key={i}>• {val}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* RIGHT */}
                                            <div className="text-lg font-semibold text-orange-600">
                                                ₹{m.price}
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

            {/* Regular  Fiexd menu section */}
            <div>
                <div className="max-w-7xl mx-auto px-4 mt-10 ">
                    <div className="text-center m-10">
                        <h1 className="text-3xl font-bold font-merienda ">Regular Thali Specials</h1>
                        <h4 className="text-gray-500  font-poppins">
                            Fresh, filling, and satisfying meals
                        </h4>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 ">

                        {/* SINGLE CARD */}
                        <div className="rounded-xl ">

                            {regularMenu
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

                                                <ul className="mt-3 text-sm text-gray-600 space-y-1 italic">
                                                    {m.items?.map((val, i) => (
                                                        <li key={i}>• {val}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* RIGHT */}
                                            <div className="text-lg font-semibold text-orange-600">
                                                ₹{m.price}
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









        </>
    )
}

export default Menu
