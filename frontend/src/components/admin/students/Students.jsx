import { useEffect, useState } from "react";
import axios from "axios";
import AdminHero from "../AdminHero.jsx";
import AddStudentModal from "./AddStudentModal.jsx";
import { API } from "../../../api/api.js";
import { motion } from "framer-motion";
import EditStudentModal from "./EditStudentModal.jsx";

const Students = () => {
    const [students, setStudents] = useState([]);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editForm, setEditForm] = useState({
        name: "",
        mobile: "",
        email: "",
        address: "",
    });


    //  NEW STATES
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


    //  EDIT HANDLER
    const handleEdit = () => {
        if (!selectedStudent) {
            alert("Select student first");
            return;
        }

        //  Prefill form with old data
        setEditForm({
            name: selectedStudent.name || "",
            mobile: selectedStudent.mobile || "",
            email: selectedStudent.email || "",
            address: selectedStudent.address || "",
        });

        setEditOpen(true);
    };

    //update student handler
    const handleUpdateStudent = async () => {
        try {
            await axios.put(
                `${API}/students/${selectedStudent._id}`,
                editForm
            );

            alert("Student updated ✅");
            setEditOpen(false);
            setSelectedStudent(null);
            fetchStudents();
        } catch (err) {
            console.error(err);
            alert("Update failed ❌");
        }
    };


    //  DELETE HANDLER
    const handleDelete = async () => {
        if (!selectedStudent) {
            alert("Please select a student to delete");
            return;
        }

        const confirmDelete = window.confirm(
            `Delete ${selectedStudent.name}?`
        );
        if (!confirmDelete) return;

        try {
            await axios.delete(`${API}/students/${selectedStudent._id}`);

            alert("Student deleted");
            setSelectedStudent(null);
            fetchStudents();
        } catch (err) {
            console.error(err);
            alert("Delete failed");
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
            >
                <AdminHero />

                <div className="p-4 md:p-6">
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        Students
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
                                    <th className="p-2 border">
                                        Attendance
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {students.map((s) => (
                                    <tr
                                        key={s._id}
                                        onClick={() => handleSelectStudent(s)}
                                        className={`cursor-pointer transition
                ${selectedStudent?._id === s._id
                                                ? "bg-blue-100"
                                                : "hover:bg-gray-50"
                                            }
            `}
                                    >
                                        <td className="p-2 border">{s.name}</td>
                                        <td className="p-2 border">{s.mobile}</td>
                                        <td className="p-2 border">{s.email || "-"}</td>
                                        <td className="p-2 border">{s.address || "-"}</td>

                                        <td className="p-2 border text-center">
                                            <button
                                                onClick={(e) => e.stopPropagation()} // ⛔ prevent row toggle
                                                className="text-green-600 font-semibold underline"
                                            >
                                                {s.attendance?.presentCount || 0} / 30 days
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                    {/* MOBILE CARDS */}
                    <div className="md:hidden space-y-4">
                        {students.map((s) => {
                            const presentCount = s.attendance?.presentCount || 0;

                            return (
                                <div
                                    key={s._id}
                                    onClick={() => handleSelectStudent(s)}
                                    className={`border rounded-lg p-4 shadow-sm bg-white cursor-pointer transition${selectedStudent?._id === s._id
                                        ? "ring-2 ring-blue-400"
                                        : ""
                                        }
                `}
                                >
                                    <p className="font-semibold text-lg">{s.name}</p>

                                    <p className="text-sm text-gray-600">📞 {s.mobile}</p>
                                    <p className="text-sm text-gray-600">📧 {s.email || "-"}</p>
                                    <p className="text-sm text-gray-600">📍 {s.address || "-"}</p>

                                    <button
                                        onClick={(e) => e.stopPropagation()} // ⛔ prevent toggle
                                        className="text-green-600 font-semibold underline"
                                    >
                                        {presentCount} / 30 days
                                    </button>
                                </div>
                            );
                        })}
                    </div>


                </div>

                {/* BUTTONS SECTION */}
                <div className="p-6">
                    <div className="flex gap-3 flex-wrap">
                        <button
                            onClick={() => setOpen(true)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
                        >
                            + Add Student
                        </button>

                        <button
                            onClick={handleEdit}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
                        >
                            ✏️ Edit
                        </button>

                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700"
                        >
                            🗑 Delete
                        </button>
                    </div>

                    {/* Selected student preview (optional) */}
                    {selectedStudent && (
                        <p className="mt-3 text-sm text-gray-600">
                            Selected:{" "}
                            <span className="font-semibold">
                                {selectedStudent.name}
                            </span>
                        </p>
                    )}

                    {open && (
                        <AddStudentModal
                            onClose={() => setOpen(false)}
                        />
                    )}
                </div>
            </motion.div>
            {editOpen && (
                <EditStudentModal
                    editForm={editForm}
                    setEditForm={setEditForm}
                    onClose={() => setEditOpen(false)}
                    onSave={handleUpdateStudent}
                />
            )}

        </>
    );
};

export default Students;
