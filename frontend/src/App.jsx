import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminSignup from "./components/admin/Signup"
import AdminLogin from "./components/admin/Login"
import Update from "./components/admin/Update"
import EditMenu from "./components/admin/EditMenu"
import Home from "./components/user/Home"
import NotFound from './components/NotFound'
import ProtectedRoute from "./components/ProtectedRoute"
import AdminPanels from "./components/admin/adminPanels"

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
          <Route path="admin/panels" element={<AdminPanels/>} />
          <Route path="/admin/update" element={<Update />} />
          <Route path="/admin/edit/:id" element={<EditMenu />} />
        </Route>

        {/*  Catch all wrong routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
