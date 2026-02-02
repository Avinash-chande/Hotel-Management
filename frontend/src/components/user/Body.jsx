import { useEffect, useState } from "react"
import axios from "axios"
import { API } from '../../api/api.js'

export default function MenuUI() {
    const [menu, setMenu] = useState([])
    const [time, setTime] = useState(new Date());
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

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());

        }, 1000)
        return () => clearInterval(interval);

    }, [])


    return (
        <div className="min-h-screen bg-[#faf7f2]">

            {/* HERO */}
            <div
                className="h-[380px] bg-cover bg-center relative"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1541544741938-0af808871cc0')",
                }}
            >
                <div className="absolute inset-0 bg-black/40"></div>

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">
                        होटल धरमरराज
                    </h1>
                    <p className="text-lg opacity-90">घरगुती जेवण</p>

                    <div className="mt-4 flex items-center gap-3">
                        <span className="px-4 py-1 bg-green-500 rounded-full text-sm font-semibold">
                            Open
                        </span>
                        <span className="text-sm opacity-80">
                            <div className="text-sm text-gray-200">
                                Updated:{" "}
                                {time.toLocaleString("en-IN", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                })}
                            </div>
                        </span>
                    </div>
                </div>
            </div>

            <div className="text-center mt-10">
                <h1 className="text-3xl font-bold font-merienda ">Today&apos;s Menu</h1>
                <h4 className="text-gray-500  font-poppins">
                    Freshly prepared dishes with authentic flavors
                </h4>

            </div>

            {/* MENU SECTION */}

            <div className="max-w-7xl mx-auto px-4 mt-10">
                <div className="bg-white rounded-2xl shadow-lg p-6">

                    {/* Menu Card */}
                    <div className="border rounded-xl p-5 mb-4">
                        {menu.map((m) => (
                            <div
                                key={m._id}
                                className="flex justify-between items-start rounded-xl "
                            >
                                <div className="w-full">
                                    <h3 className="text-xl font-semibold">राईस प्लेट </h3>

                                    <div className="flex gap-2 mt-2">
                                        <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                                            Limited
                                        </span>
                                        <span className="bg-green-100 px-2 py-1 rounded-full text-xs">
                                            {m.status}
                                        </span>
                                    </div>


                                    <ul className="mt-3 text-sm text-gray-600 space-y-1">
                                        {m.items?.map((val, i) => (
                                            <li key={i}>• {val}</li>
                                        ))}
                                    </ul>

                                </div>
                                <div className="text-xl font-bold text-orange-600">
                                    ₹60
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border rounded-xl p-5 mb-4">
                        {menu.map((m) => (
                            <div
                                key={m._id}
                                className="flex justify-between items-start rounded-xl "
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


                                    <ul className="mt-3 text-sm text-gray-600 space-y-1">
                                        {m.items?.map((val, i) => (
                                            <li key={i}>• {val}</li>
                                        ))}
                                    </ul>
                                    <ul className="mt-1 text-sm text-gray-600 space-y-1">
                                        <li>•3 चपाती </li>
                                    </ul>

                                </div>
                                <div className="text-xl font-bold text-orange-600">
                                    ₹60
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className="border rounded-xl p-5 mb-4 hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold flex items-center gap-2">
                                    दाल राईस

                                    {/* <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-sm">
                    ⭐
                  </span> */}
                                </h3>

                                {/* <p className="text-sm text-gray-500 mt-1">
                  ⭐ 4.9 · 7 ratings
                </p> */}

                                <div className="flex gap-2 mt-2">
                                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                        Limited
                                    </span>
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                        Available
                                    </span>
                                </div>


                            </div>

                            <div className="text-xl font-bold text-orange-600">
                                ₹50
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            {/* regular menu section */}



            <div className="max-w-7xl mx-auto px-4 mt-10">
                <div className="bg-white rounded-2xl shadow-lg p-6">


                    {/* Menu Card */}
                    <div className="border rounded-xl p-5 mb-4 hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold flex items-center gap-2">
                                    चिकन थाळी
                                    {/* <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-sm">
                    ⭐
                  </span> */}
                                </h3>

                                {/* <p className="text-sm text-gray-500 mt-1">
                  ⭐ 4.9 · 7 ratings
                </p> */}

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

                            <div className="text-xl font-bold text-orange-600">
                                ₹150
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-xl p-5 mb-4 hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold flex items-center gap-2">
                                    अंडा  थाळी
                                    {/* <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-sm">
                    ⭐
                  </span> */}
                                </h3>

                                {/* <p className="text-sm text-gray-500 mt-1">
                  ⭐ 4.9 · 7 ratings
                </p> */}

                                <div className="flex gap-2 mt-2">
                                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                        Unlimited
                                    </span>
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                        Available
                                    </span>
                                </div>

                                <ul className="mt-3 text-sm text-gray-600 space-y-1">
                                    <li>• 2  Eggs</li>
                                    <li>• चपाती / भाकरी Unlimited</li>
                                    <li>• राईस Unlimited</li>
                                    <li>• रस्सा Unlimited</li>
                                </ul>
                            </div>

                            <div className="text-xl font-bold text-orange-600">
                                ₹120
                            </div>
                        </div>
                    </div>


                    <div className="border rounded-xl p-5 mb-4 hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold flex items-center gap-2">
                                    बॉइल भुर्जी
                                    {/* <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-sm">
                    ⭐
                  </span> */}
                                </h3>

                                {/* <p className="text-sm text-gray-500 mt-1">
                  ⭐ 4.9 · 7 ratings
                </p> */}

                                <div className="flex gap-2 mt-2">
                                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                        Unlimited
                                    </span>
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                        Available
                                    </span>
                                </div>

                                <ul className="mt-3 text-sm text-gray-600 space-y-1">
                                    <li>• 2 Eggs</li>
                                    <li>• 3 चपाती </li>
                                </ul>
                            </div>

                            <div className="text-xl font-bold text-orange-600">
                                ₹80
                            </div>
                        </div>
                    </div>


                    <div className="border rounded-xl p-5 mb-4 hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold flex items-center gap-2">
                                    ऑम्लेट चपाती

                                    {/* <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-sm">
                    ⭐
                  </span> */}
                                </h3>

                                {/* <p className="text-sm text-gray-500 mt-1">
                  ⭐ 4.9 · 7 ratings
                </p> */}

                                <div className="flex gap-2 mt-2">
                                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                        Unlimited
                                    </span>
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                        Available
                                    </span>
                                </div>

                                <ul className="mt-3 text-sm text-gray-600 space-y-1">
                                    <li>• 2 Eggs</li>
                                    <li>•3 चपाती</li>
                                </ul>
                            </div>

                            <div className="text-xl font-bold text-orange-600">
                                ₹70
                            </div>
                        </div>

                    </div>

                    <div className="border rounded-xl p-5 mb-4 hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold flex items-center gap-2">
                                    भुर्जी चपाती
                                    {/* <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-sm">
                    ⭐
                  </span> */}
                                </h3>

                                {/* <p className="text-sm text-gray-500 mt-1">
                  ⭐ 4.9 · 7 ratings
                </p> */}

                                <div className="flex gap-2 mt-2">
                                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                        Unlimited
                                    </span>
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                        Available
                                    </span>
                                </div>

                                <ul className="mt-3 text-sm text-gray-600 space-y-1">
                                    <li>• 2 Eggs</li>
                                    <li>•3 चपाती</li>
                                </ul>
                            </div>

                            <div className="text-xl font-bold text-orange-600">
                                ₹70
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    );
}
