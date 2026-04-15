import { useEffect, useState } from "react";
import Menu from "./Menu";
import axios from "axios";
import { API } from "../../api/api.js";

export default function MenuUI() {
    const [time, setTime] = useState(new Date());
    const [hotelName, setHotelName] = useState("");
    const [status, setStatus] = useState("open");
    const [loading, setLoading] = useState(true);
    const [showProfile, setShowProfile] = useState(false);
    const [students, setStudents] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        if (!user) {
            window.location.href = "/login";
        }
    }, []);

    // 🔥 Fetch Students
    const fetchStudents = async () => {
        try {
            const res = await axios.get(`${API}/students`);
            setStudents(res.data.students);
        } catch (err) {
            console.error("Failed to fetch students", err);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // 🔥 Find current logged-in user
    const currentUser = students.find(
        (s) => s.email === user?.email
    );

    // 🔥 Fetch Hotel Data
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

    // ⏰ Time
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#faf7f2] relative">

            {/* 🔹 PROFILE BUTTON */}
            <div
                onClick={() => setShowProfile(true)}
                className="absolute top-4 left-4 flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-md cursor-pointer z-30"
            >
                <div className="w-10 h-10 flex items-center justify-center bg-orange-500 text-white rounded-full font-bold">
                    {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                    <p className="text-sm font-semibold">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
            </div>

            {/* 🔥 SIDEBAR */}
            {/* 🔥 SIDEBAR / PROFILE MODAL */}
            {showProfile && (
                <>
                    {/* 🔹 BLUR BACKGROUND */}
                    <div
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                        onClick={() => setShowProfile(false)}
                    />

                    {/* 🔹 FLOATING CARD CONTAINER */}
                    <div className="fixed top-0 left-0 h-full w-80 z-50 flex items-start justify-center p-6">

                        {/* 🔹 CARD */}
                        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full animate-slideIn">

                            {/* Profile */}
                            <div className="flex flex-col items-center mb-4">
                                <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold">
                                    {user?.name?.charAt(0)}
                                </div>

                                <h2 className="mt-3 text-lg font-semibold text-gray-800">
                                    {user?.name}
                                </h2>

                                <p className="text-gray-500 text-sm">User</p>
                            </div>

                            <div className="border-t border-gray-200 my-4"></div>

                            {/* Profile Info */}
                            <div className="bg-gray-100 rounded-xl p-4 mb-4 text-center ">
                                <h3 className="font-semibold text-gray-700 mb-2">
                                    My Profile
                                </h3>

                                <p className="text-sm text-gray-700">
                                    <span className="font-medium">Name:</span>{" "}
                                    {currentUser?.name || user?.name}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {currentUser?.email || user?.email}
                                </p>

                                {/* ✅ ATTENDANCE (ONE LINE FIXED) */}
                                <p className="text-green-600 font-semibold mt-2 text-center leading-tight">
                                    {currentUser?.attendanceCount != null
                                        ? `My Attendance: ${currentUser.attendanceCount} / 30 days`
                                        : "🍽️ Join monthly mess to track attendance"}
                                </p>
                            </div>

                            {/* Logout */}
                            <button
                                onClick={() => {
                                    localStorage.removeItem("user");
                                    window.location.href = "/login";
                                }}
                                className="w-full text-orange-500 font-bold hover:underline text-center"
                            >
                                Logout
                            </button>

                        </div>
                    </div>
                </>
            )}

            {/* 🔹 HERO */}
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
                        {hotelName || "Hotel Dharamraj"}
                    </h1>

                    <p className="text-lg opacity-90">घरगुती जेवण</p>

                    <div className="mt-4 flex items-center gap-3">
                        <span className={`px-4 py-1 rounded-full text-sm font-semibold ${status === "open" ? "bg-green-500" : "bg-red-500"}`}>
                            {status === "open" ? "Open" : "Closed"}
                        </span>

                        <span className="text-sm opacity-80">
                            Updated: {time.toLocaleString("en-IN", {
                                dateStyle: "medium",
                                timeStyle: "short",
                            })}
                        </span>
                    </div>
                </div>
            </div>

            {/* 🔹 MENU */}
            <div className="relative mt-8">
                <div className={`${status === "closed" ? "blur-sm pointer-events-none" : ""}`}>
                    <Menu />
                </div>

                {status === "closed" && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-lg text-center">
                            🚫 Hotel is currently closed
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}