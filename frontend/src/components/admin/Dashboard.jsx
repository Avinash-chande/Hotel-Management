import React from 'react';
import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  UtensilsCrossed,
  Users,
  CreditCard,
  Package,
  CalendarCheck,
  Settings,
  LogOut
} from 'lucide-react';
import axios from "axios"
import { API } from '../../api/api.js';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${API}/api/logout`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
    } catch (err) {
      console.warn("Logout API failed, forcing logout", err);
    } finally {
      //  ALWAYS clear auth & redirect
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      navigate("/admin/login", { replace: true });
    }
  };
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700 flex items-center gap-2">
          <span className="text-blue-500">🚀</span> AdminPro
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <Link to="/admin/update">
            <SidebarItem
              icon={<UtensilsCrossed />}
              label="Menu Management"
            />
          </Link>

          <SidebarItem icon={<Users size={20} />} label="Students" />
          <SidebarItem icon={<CreditCard size={20} />} label="Payments" />
          <SidebarItem icon={<Package size={20} />} label="Orders" />
          <SidebarItem icon={<CalendarCheck size={20} />} label="Attendance" />
          <hr className="border-gray-700 my-4" />
          <SidebarItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button onClick={handleLogout} className="w-full flex items-center p-3 text-red-400 hover:bg-red-900/30 rounded-lg transition">
            <LogOut size={20} className="mr-3" /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard Overview</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-500">Welcome, Admin</span>
            <img
              src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
              className="w-10 h-10 rounded-full border"
              alt="Admin Avatar"
            />
          </div>
        </header>

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard label="Total Students" value="1,284" color="border-blue-500" />
            <StatCard label="Today's Revenue" value="$4,520" color="border-green-500" />
            <StatCard label="Pending Orders" value="24" color="border-orange-500" />
            <StatCard label="Attendance Rate" value="94%" color="border-purple-500" />
          </div>

          {/* Recent Activity Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-700">Recent Orders</h3>
              <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Student</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Item</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <TableRow id="#ORD-5521" name="John Doe" item="Spicy Ramen 🍜" status="Completed" statusColor="bg-green-100 text-green-700" />
                <TableRow id="#ORD-5522" name="Jane Smith" item="Chicken Curry 🍛" status="Pending" statusColor="bg-yellow-100 text-yellow-700" />
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

// Sub-components for better organization
const SidebarItem = ({ icon, label, active = false }) => (
  <a href="#" className={`flex items-center p-3 rounded-lg transition-colors ${active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
    <span className="mr-3">{icon}</span>
    {label}
  </a>
);

const StatCard = ({ label, value, color }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${color}`}>
    <p className="text-gray-500 text-sm">{label}</p>
    <h3 className="text-2xl font-bold">{value}</h3>
  </div>
);

const TableRow = ({ id, name, item, status, statusColor }) => (
  <tr>
    <td className="px-6 py-4 text-sm">{id}</td>
    <td className="px-6 py-4 text-sm font-medium">{name}</td>
    <td className="px-6 py-4 text-sm">{item}</td>
    <td className="px-6 py-4">
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
        {status}
      </span>
    </td>
  </tr>
);

export default AdminPanel;