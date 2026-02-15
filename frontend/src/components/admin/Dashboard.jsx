import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Users,
  CreditCard,
  Package,
  CalendarCheck,
  Settings,
  LogOut,
  TrendingUp,
  ShoppingBag,
  CheckCircle,
  Menu
} from "lucide-react";
import axios from "axios";
import { API } from "../../api/api.js";
import AdminSettingsModal from "./AdminSettingsModal";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [totalStudents, setTotalStudents] = useState(0);
  const [dashboard, setDashboard] = useState({});

  const fetchStudentCount = async () => {
    try {
      const res = await axios.get(`${API}/auth/count`);
      setTotalStudents(res.data.count);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudentCount();
  }, []);

  useEffect(() => {
    axios.get(`${API}/auth/dashboard/attendanceRate`)
      .then(res => setDashboard(res.data));
  }, []);


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
      console.warn("Logout failed, forcing logout", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      navigate("/admin/login", { replace: true });
    }
  };

  return (
    <div className="relative flex h-screen overflow-hidden bg-slate-50 font-sans">
      {/* SIDEBAR */}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-[#1E293B] text-slate-300 flex flex-col
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 border-r border-slate-800`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="bg-orange-500 p-1.5 rounded-lg">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">AdminPro</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active
            onClick={() => setSidebarOpen(false)}
          />

          <Link to="/admin/update" onClick={() => setSidebarOpen(false)}>
            <SidebarItem icon={<UtensilsCrossed size={20} />} label="Menu Management" />
          </Link>

          <Link to="/admin/students" onClick={() => setSidebarOpen(false)}>
            <SidebarItem icon={<Users size={20} />} label="Students" />
          </Link>

          <Link to="/admin/attendance" onClick={() => setSidebarOpen(false)}>
            <SidebarItem icon={<CalendarCheck size={20} />} label="Attendance" />
          </Link>

          <div className="pt-4 mt-4 border-t border-slate-700">
            <SidebarItem
              icon={<Settings size={20} />}
              label="Settings"
              onClick={() => setOpenSettings(true)}
            />
          </div>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 font-medium
            rounded-xl hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* OVERLAY (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* HEADER */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-200 px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h2 className="text-xl font-bold text-slate-800">Dashboard Overview</h2>
          </div>

          <div className="flex items-center gap-4 bg-white p-1.5 pr-4 rounded-full shadow-sm border border-slate-200">
            <img
              src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
              className="w-8 h-8 rounded-full"
              alt="Admin Avatar"
            />
            <div className="hidden sm:block text-sm">
              <p className="text-slate-400 leading-none text-[10px] uppercase font-bold tracking-wider">Welcome</p>
              <p className="font-semibold text-slate-700">Admin User</p>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-4 md:p-8">
          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard label="Total Students" value={totalStudents} icon={<Users className="text-blue-600" />} accent="bg-blue-500" />
            <StatCard label="Today's Revenue" value="$4,520" icon={<CreditCard className="text-green-600" />} accent="bg-green-500" />
            <StatCard label="Pending Orders" value="24" icon={<ShoppingBag className="text-orange-600" />} accent="bg-orange-500" />
            <StatCard label="Attendance Rate" value={`${dashboard.attendanceRate ?? 0}%`} icon={<CheckCircle className="text-purple-600" />} accent="bg-purple-500" />
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-lg">Recent Orders</h3>
              <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Item</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <TableRow id="#ORD-5521" name="John Doe" item="Spicy Ramen 🍜" status="Completed" />
                  <TableRow id="#ORD-5522" name="Jane Smith" item="Chicken Curry 🍛" status="Pending" />
                </tbody>
              </table>
            </div>
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

/* REUSABLE COMPONENTS */

const SidebarItem = ({ icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center p-3 rounded-xl transition-all duration-200
    ${active
        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
  >
    <span className="mr-3">{icon}</span>
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const StatCard = ({ label, value, icon, accent }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group">
    <div className={`absolute top-0 left-0 w-1 h-full ${accent}`} />
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
        <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
      </div>
      <div className="p-3 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
    </div>
  </div>
);

const TableRow = ({ id, name, item, status }) => {
  const isCompleted = status === "Completed";
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4 text-sm text-slate-500 font-medium">{id}</td>
      <td className="px-6 py-4 font-bold text-slate-800">{name}</td>
      <td className="px-6 py-4 text-slate-600 text-sm">{item}</td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isCompleted ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
          }`}>
          {status}
        </span>
      </td>
    </tr>
  );
};

export default AdminPanel;