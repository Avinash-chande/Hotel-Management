import { Routes, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

import AdminSignup from "./components/Signup.jsx"
import AdminLogin from "./components/Login.jsx"
import Update from "./components/admin/Update"
import Home from "./components/user/Home"
import NotFound from './components/NotFound'
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./components/admin/Dashboard"
import Students from "./components/admin/students/StudentsData"
import Attendance from "./components/admin/students/Attendance.jsx"
import UserHome from "./components/user/UserHome.jsx";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* HOME PAGE */}
        <Route path="/" element={<UserHome />} />

        {/* login and signup */}
        <Route path="/signup" element={<AdminSignup />} />
        <Route path="/login" element={<AdminLogin />} />

        {/* User protected routes */}
        <Route element={<ProtectedRoute allowedRole="user" />}>
          <Route path="/user/home" element={<Home />} />
        </Route>

        {/* Admin  protected routes */}
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/update" element={<Update />} />
          <Route path="/admin/students" element={<Students />} />
          <Route path="/admin/attendance" element={<Attendance />} />
        </Route>


        {/*  Catch all wrong routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}
