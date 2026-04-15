import { useEffect, useState } from "react"
import axios from "axios"
import { API } from "../../api/api.js"
import { Link } from "react-router-dom"



export default function MenuUI() {
    const [time, setTime] = useState(new Date());
    const [hotelName, setHotelName] = useState("");
    const [status, setStatus] = useState("open")
    const [loading, setLoading] = useState(true)


    // this is for fetching status of the site meaning whether the hotel is open or closed
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await axios.get(`${API}/admin/settings`, {

                });
                // console.log("Fetched status:", res.data.isOpen)
                setStatus(res.data.isOpen ? "open" : "closed")
                setHotelName(res.data.hotelName)
            } catch (err) {
                console.error("Failed to fetch status", err)
            } finally {
                setLoading(false)
            }
        }

        fetchStatus()
    }, [])


    //this is for time
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());

        }, 1000)
        return () => clearInterval(interval);

    }, [])


    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                Loading...
            </div>
        )
    }


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
                        {hotelName || "Loading..."}
                    </h1>

                    <p className="text-lg opacity-90">घरगुती जेवण</p>

                    <div className="mt-4 flex items-center gap-3">
                        <span
                            className={`px-4 py-1 rounded-full text-sm font-semibold ${status === "open"
                                ? "bg-green-500"
                                : "bg-red-500"
                                }`}
                        >
                            {status === "open" ? "Open" : "Closed"}
                        </span>


                        {/*time and date */}
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

            {/* FOOTER */}


            <footer className="bg-[#f9f4ec] py-16 px-6">

                {/* Admin Login */}
                <div className="text-center m-10">
                    <p className="text-orange-500 font-bold mb-3 uppercase tracking-wide">View Today's Specials</p>
                    <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-2 rounded-lg shadow hover:scale-105 transition">
                        <Link to="/login">Login</Link>
                    </button>
                </div>

                {/* Notice */}
                <div className="flex  justify-center mb-12">
                    <div className="border flex-col border-orange-300 bg-orange-50 text-orange-700 px-6 py-4 rounded-lg flex items-center gap-2 max-w-xl bg-white shadow-xl text-center">
                        <span className="font-semibold">⚠ Important</span>
                        <p>
                            We kindly request you to park your vehicle on the main road when
                            arriving at the hotel.
                        </p>
                    </div>
                </div>


                {/* Find Us */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">Find Us</h2>
                    <p className="text-gray-500 mt-2">Visit us at our convenient location</p>
                </div>

                {/* Content */}
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    {/* Location Card */}
                    <div className="flex justify-center">
                        <div className="bg-white shadow-lg rounded-xl p-6 max-w-sm text-center">
                            <h3 className="font-semibold text-lg mb-2">Location</h3>
                            <p className="text-gray-600">
                                Behind Vaishno Devi Mandir, Akurdi Railway Station, Pune
                            </p>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="flex justify-center">
                        <iframe
                            className="rounded-xl shadow-lg w-full max-w-md h-64"
                            src="https://www.google.com/maps?q=18.6476,73.7682&z=15&output=embed"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>


            </footer>


        </div>
    );
}
