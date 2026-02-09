import { useEffect, useState } from "react";
import axios from "axios";
import AdminHero from "./AdminHero";
import AddStudentModal from "./AddStudentModal";

const Students = () => {
    const [students, setStudents] = useState([]);
    const [open, setOpen] = useState(false);

    const fetchStudents = async () => {
        const res = await axios.get("http://localhost:3000/api/students");
        setStudents(res.data.students);
    };


    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <>
            <AdminHero />
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Students</h2>

                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Mobile</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s) => (
                            <tr key={s._id}>
                                <td className="p-2 border">{s.name}</td>
                                <td className="p-2 border">{s.mobile}</td>
                                <td className="p-2 border">{s.email || "-"}</td>
                                <td className="p-2 border">{s.address || "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    

                    <button
                        onClick={() => setOpen(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
                    >
                        + Add Student
                    </button>
                </div>

                {/* Students Table here */}
                {/* ... */}

                {open && <AddStudentModal onClose={() => setOpen(false)} />}
            </div>

        </>
    );
};

export default Students;
