import { Routes, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

import AdminSignup from "./components/admin/Signup"
import AdminLogin from "./components/admin/Login"
import Update from "./components/admin/Update"
import Home from "./components/user/Home"
import NotFound from './components/NotFound'
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./components/admin/Dashboard"
import Students from "./components/admin/students/StudentsData"
import Attendance from "./components/admin/students/Attendance.jsx"

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* USER */}
        <Route path="/" element={<Home />} />

        {/* ADMIN */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="admin/dashboard" element={<Dashboard />} />
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
