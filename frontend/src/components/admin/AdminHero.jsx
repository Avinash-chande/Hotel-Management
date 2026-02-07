import { useEffect, useState } from "react"
import axios from "axios"
import { API } from "../../api/api.js"



function AdminHero() {
    const [time, setTime] = useState(new Date());
    const [hotelName, setHotelName] = useState("");
    const [status, setStatus] = useState("open")
    const [loading, setLoading] = useState(true)


    // this is for fetching status of the site meaning whether the hotel is open or closed
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await axios.get(`${API}/admin/settings`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
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
        <div>
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


        </div>
    )
}
export default AdminHero
