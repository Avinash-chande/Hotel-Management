import { useState, useEffect } from "react"
import { adminSignup } from "../api/api"
import { Link } from "react-router-dom"

export default function AdminSignup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [active, setActive] = useState("signup");

  //this for only sign in and up button 
  useEffect(() => {
    if (location.pathname.includes("login")) {
      setActive("signin");
    } else {
      setActive("signup");
    }
  }, [location.pathname]);

  const submit = async (e) => {
    e.preventDefault()
    await adminSignup({ name, email, password })
    alert(" Registered successfully! Please log in.")
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Back */}
        <div className="text-center mb-4">
          <a href="/" className="text-orange-500 text-sm hover:underline">
            ← Back to Home
          </a>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-500 text-white text-xl">
            →
          </div>
          <h2 className="text-xl font-bold mt-3 font-sans text-orange-600">
            Hotel Dharamraj
          </h2>
          <p className="text-gray-500 text-sm">Admin Access</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-lg mb-4">
          <button onClick={() => setActive("signin")}
            className={`relative z-10 flex-1 py-2 text-sm font-medium transition
          ${active === "signin" ? "text-orange-600 bg-white border-2 border-amber-400 rounded-2xl shadow-xl" : "text-gray-500"}`}>
            <Link to="/login">Sign In</Link>
          </button>
          <button onClick={() => setActive("signup")}
            className={`relative z-10 flex-1 py-2 text-sm font-medium transition
          ${active === "signup" ? "text-orange-600 bg-white border-2 border-amber-400 rounded-2xl shadow-xl" : "text-gray-500"}`}>
            <Link to="/signup">Sign Up</Link>
          </button>
        </div>


        {/* Form */}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm text-orange-600">Full Name</label>
            <input
              type="text" required onChange={e => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full mt-1 px-3 py-2  bg-[#F5F2EB] border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-orange-600">Email</label>
            <input
              type="email" required onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 px-3 py-2  bg-[#F5F2EB] border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-orange-600">Password</label>
            <input
              type="password" required onChange={e => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full mt-1 px-3 py-2  bg-[#F5F2EB] border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>


      </div>
    </div>
  );
}
