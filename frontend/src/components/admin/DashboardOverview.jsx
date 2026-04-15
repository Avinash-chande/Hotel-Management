import { UserPlus, ClipboardCheck, UtensilsCrossed, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";
import AddStudentModal from "./students/AddStudentModal.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../api/api.js";

export default function DashboardWidgets() {

    const [open, setOpen] = useState(false)
    const [dashboard, setDashboard] = useState(null)

    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`${API}/auth/dashboard/attendanceRate`)
            .then(res => setDashboard(res.data));
    }, []);



    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

            {/* QUICK ACTIONS */}
            <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Quick Actions
                </h2>

                <div className="grid grid-cols-2 gap-4">

                    <button  onClick={() => setOpen(true)} className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition">
                        <UserPlus className="text-blue-600" size={20} />
                        <span className="text-sm font-medium text-gray-700">
                            Add Student
                        </span>
                    </button>

                    <button onClick={() => navigate("/admin/attendance")} className="flex items-center gap-3 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition">
                        <ClipboardCheck className="text-green-600" size={20} />
                        <span  className="text-sm font-medium text-gray-700">
                            Mark Attendance
                        </span>
                    </button>

                    <button onClick={() => navigate("/admin/update")} className="flex items-center gap-3 p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition">
                        <UtensilsCrossed className="text-orange-600" size={20} />
                        <span  className="text-sm font-medium text-gray-700">
                            Add Menu
                        </span>
                    </button>

                    <button className="flex items-center gap-3 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition">
                        <BarChart3 className="text-purple-600" size={20} />
                        <span className="text-sm font-medium text-gray-700">
                            View Reports
                        </span>
                    </button>

                </div>
            </div>


            {open && <AddStudentModal onClose={() => setOpen(false)} />}


        </div>
    );
}
