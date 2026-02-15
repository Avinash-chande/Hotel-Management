import { useEffect, useState } from "react";
import axios from "axios";
import AdminHero from "../AdminHero.jsx";
import AddStudentModal from "./AddStudentModal.jsx";
import { API } from "../../../api/api.js";
import { motion } from "framer-motion";
import EditStudentModal from "./EditStudentModal.jsx";
import AttendanceModal from "./AttendanceModal.jsx"; // Import the new modal
import Footer from "../footer/Footer.jsx";

const Students = () => {
    const [students, setStudents] = useState([]);
    const [attendanceOpen, setAttendanceOpen] = useState(false); // NEW STATE
    const [selectedStudent, setSelectedStudent] = useState(null);

    const fetchStudents = async () => {
        const res = await axios.get(`${API}/students`);
        setStudents(res.data.students);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleSelectStudent = (student) => {
        setSelectedStudent((prev) =>
            prev?._id === student._id ? null : student
        );
    };

    // Open Attendance Card
    const handleOpenAttendance = (student) => {
        setSelectedStudent(student);
        setAttendanceOpen(true);
    };



    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
            >
                <AdminHero />

                <div className="bg-[#f8f4f0] ">
                    <div className="p-4 md:p-6">
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            Student Attendance Overview
                        </h2>


                        {/* DESKTOP TABLE */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full border">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-2 border">Name</th>
                                        <th className="p-2 border">Mobile</th>
                                        <th className="p-2 border">Email</th>
                                        <th className="p-2 border">Address</th>
                                        <th className="p-2 border">Attendance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((s) => (
                                        <tr
                                            key={s._id}
                                            onClick={() => handleSelectStudent(s)}
                                            className={`cursor-pointer transition ${selectedStudent?._id === s._id ? "bg-blue-100" : "hover:bg-gray-50"}`}
                                        >
                                            <td className="p-2 border">{s.name}</td>
                                            <td className="p-2 border">{s.mobile}</td>
                                            <td className="p-2 border">{s.email || "-"}</td>
                                            <td className="p-2 border">{s.address || "-"}</td>
                                            <td className="p-2 border text-center">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleOpenAttendance(s);
                                                    }}
                                                    className="text-green-600 font-bold underline hover:text-green-800"
                                                >
                                                    {s.attendanceCount || 0} / 30 days
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* MOBILE CARDS */}
                        <div className="md:hidden space-y-4">
                            {students.map((s) => (
                                <div
                                    key={s._id}
                                    onClick={() => handleSelectStudent(s)}
                                    className={`border rounded-lg p-4 shadow-sm bg-white cursor-pointer transition ${selectedStudent?._id === s._id ? "ring-2 ring-blue-400" : ""}`}
                                >
                                    <p className="font-semibold text-lg">{s.name}</p>
                                    <p className="text-sm text-gray-600">📞 {s.mobile}</p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenAttendance(s);
                                        }}
                                        className="text-green-600 font-semibold underline mt-2"
                                    >
                                        {s.attendanceCount || 0} / 30 days
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>


                    {attendanceOpen && (
                        <AttendanceModal
                            student={selectedStudent}
                            onClose={() => {
                                setAttendanceOpen(false);
                                setSelectedStudent(null);
                            }}
                            onSaveSuccess={() => {
                                setAttendanceOpen(false);
                                fetchStudents(); // Refresh table with new counts
                            }}
                        />
                    )}
                    <Footer />
                </div>
            </motion.div>
        </>
    );
};

export default Students;