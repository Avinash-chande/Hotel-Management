import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { adminLogin } from "../../api/api"
import { Link } from "react-router-dom";

export default function AdminSignup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [active, setActive] = useState("signup");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate()

  //this is for btn animation
  useEffect(() => {
    if (location.pathname.includes("login")) {
      setActive("signin");
    } else {
      setActive("signup");
    }
  }, [location.pathname]);


  const login = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await adminLogin({ email, password });

      console.log(res)

      //  success check
      if (res.success && res.data.user.role === "admin") {
        setError("")
        localStorage.setItem("accessToken", res.data.accessToken)
        localStorage.setItem("user", JSON.stringify(res.data.user));
        // localStorage.setItem("isAdminLoggedIn", "true") // MUST be string

        // redirect admin
        nav("/admin/panels");
      } else {
        setError(res.data.message || "You are not authorized to access the admin panel.");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };


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
          <h2 className="text-xl font-sans font-bold  mt-3 text-orange-600">
            Hotel Dharamraj
          </h2>
          <p className="text-gray-500 text-sm">Admin Access</p>
        </div>

        <div className="flex bg-gray-100 rounded-lg mb-4">
          <button onClick={() => setActive("signin")}
            className={`relative z-10 flex-1 py-2 text-sm font-medium transition
          ${active === "signin" ? "text-orange-600 bg-white border-2 border-amber-400 rounded-2xl shadow-xl" : "text-gray-500"}`}>
            <Link to="/admin/login">Sign In</Link>
          </button>
          <button onClick={() => setActive("signup")}
            className={`relative z-10 flex-1 py-2 text-sm font-medium transition
          ${active === "signup" ? "text-orange-600 bg-white border-2 border-amber-400 rounded-2xl shadow-xl" : "text-gray-500"}`}>
            <Link to="/admin/signup">Sign Up</Link>
          </button>
        </div>


        {/* error show */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-3">
            {error}
          </p>
        )}


        {/* Form */}
        <form onSubmit={login} className="space-y-4">
          <div>
            <label className="text-sm text-orange-600">Email</label>
            <input
              type="email" required onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-[#F5F2EB] mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
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
            Sign In
          </button>
        </form>

        {/* Note */}
        <div className="mt-5 bg-orange-50 text-orange-600 text-sm p-3 rounded-lg text-center">
          Note: New accounts require admin approval before access is granted.
        </div>
      </div>
    </div>
  );
}
