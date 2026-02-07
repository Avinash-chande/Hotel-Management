import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminSignup from "./components/admin/Signup"
import AdminLogin from "./components/admin/Login"
import Update from "./components/admin/Update"
import Home from "./components/user/Home"
import NotFound from './components/NotFound'
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./components/admin/Dashboard"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* USER */}
        <Route path="/" element={<Home />} />

        {/* ADMIN */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/update" element={<Update />} />
        </Route>

        {/*  Catch all wrong routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
