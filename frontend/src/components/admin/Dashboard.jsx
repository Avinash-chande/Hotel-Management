import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Users,
  CreditCard,
  Package,
  CalendarCheck,
  Settings,
  LogOut
} from "lucide-react";
import axios from "axios";
import { API } from "../../api/api.js";
import AdminSettingsModal from "./AdminSettingsModal";


const AdminPanel = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);



  const handleLogout = async () => {
    try {
      await axios.post(
        `${API}/api/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
    } catch (err) {
      console.warn("Logout failed, forcing logout");
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      navigate("/admin/login", { replace: true });
    }
  };

  return (
    <div className="relative flex h-screen overflow-hidden bg-[#F5F2EB] font-sans">

      {/* SIDEBAR */}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-[#fba96f] text-[#403226] flex flex-col
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0`}
      >
        <div className="p-6 text-2xl font-bold border-b border-gray-700 flex items-center gap-2">
          🚀 AdminPro
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active
            onClick={() => setSidebarOpen(false)}
          />

          <Link to="/admin/update" onClick={() => setSidebarOpen(false)}>
            <SidebarItem icon={<UtensilsCrossed size={20} />} label="Menu Management" />
          </Link>

          <SidebarItem icon={<Users size={20} />} label="Students" onClick={() => setSidebarOpen(false)} />
          <SidebarItem icon={<CreditCard size={20} />} label="Payments" onClick={() => setSidebarOpen(false)} />
          <SidebarItem icon={<Package size={20} />} label="Orders" onClick={() => setSidebarOpen(false)} />
          <SidebarItem icon={<CalendarCheck size={20} />} label="Attendance" onClick={() => setSidebarOpen(false)} />

          <hr className="border-gray-700 my-4" />
          <SidebarItem
            icon={<Settings size={20} />}
            label="Settings"
            onClick={() => setOpenSettings(true)}
          />


        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 text-red-700 font-bold
            rounded-lg hover:bg-red-600 hover:text-white transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* OVERLAY (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN */}
      <main className="flex-1 flex flex-col overflow-y-auto">

        {/* HEADER */}
        <header className="bg-[#F5F2EB] shadow-xl px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg bg-[#fba96f]"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>

            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              Dashboard Overview
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-gray-500">Welcome, Admin</span>
            <img
              src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border"
              alt="Admin Avatar"
            />
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-4 md:p-8 mt-3">

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard label="Total Students" value="1,284" color="border-blue-500" />
            <StatCard label="Today's Revenue" value="$4,520" color="border-green-500" />
            <StatCard label="Pending Orders" value="24" color="border-orange-500" />
            <StatCard label="Attendance Rate" value="94%" color="border-purple-500" />
          </div>

          {/* TABLE */}
          <div className="bg-[#ffe3a2] rounded-xl shadow-sm overflow-x-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="font-bold text-[#403226]">Recent Orders</h3>
              <button className="text-blue-600 text-sm font-medium hover:underline">
                View All
              </button>
            </div>

            <table className="w-full min-w-[600px] text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold uppercase">Order ID</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase">Student</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase">Item</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <TableRow id="#ORD-5521" name="John Doe" item="Spicy Ramen 🍜" status="Completed" statusColor="bg-green-100 text-green-700" />
                <TableRow id="#ORD-5522" name="Jane Smith" item="Chicken Curry 🍛" status="Pending" statusColor="bg-yellow-100 text-yellow-700" />
              </tbody>
            </table>
          </div>
        </div>
        <AdminSettingsModal
          isOpen={openSettings}
          onClose={() => setOpenSettings(false)}
        />
      </main>
    </div>
  );
};

/* COMPONENTS */

const SidebarItem = ({ icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center p-3 font-bold rounded-lg transition
    ${active ? "bg-white text-[#403226]" : "hover:bg-white/40"}`}
  >
    <span className="mr-3">{icon}</span>
    {label}
  </button>
);


const StatCard = ({ label, value, color }) => (
  <div className={`bg-[#f9b249] p-6 rounded-xl shadow-sm border-l-4 ${color}`}>
    <p className="text-[#403226] text-sm">{label}</p>
    <h3 className="text-2xl font-bold">{value}</h3>
  </div>
);

const TableRow = ({ id, name, item, status, statusColor }) => (
  <tr>
    <td className="px-6 py-4 text-sm">{id}</td>
    <td className="px-6 py-4 font-medium">{name}</td>
    <td className="px-6 py-4">{item}</td>
    <td className="px-6 py-4">
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
        {status}
      </span>
    </td>
  </tr>
);

export default AdminPanel;
