import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../api/api.js";
import { motion } from "framer-motion";

const AttendanceModal = ({ student, onClose, onSaveSuccess }) => {
    // State for the 30 circles
    const [days, setDays] = useState(
        student.attendanceArray || Array(30).fill(false)
    );

    // Stats Calculation
    const presentCount = days.filter((d) => d === true).length;
    const remainingCount = 30 - presentCount;

    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = "auto");
    }, []);

    const toggleDay = (index) => {
        const updatedDays = [...days];
        updatedDays[index] = !updatedDays[index];
        setDays(updatedDays);
    };

    const handleSave = async () => {
        try {
            await axios.put(`${API}/students/${student._id}/attendance`, {
                attendanceArray: days,
            });
            onSaveSuccess();
        } catch (err) {
            console.error(err);
            alert("Failed to save ❌");
        }
    };

    return (
        /* OVERLAY: Fixed, Blurred, and Centered */
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white w-full max-w-[400px] rounded-2xl shadow-2xl p-6 relative"
            >
                {/* Header Section */}
                <h2 className="text-xl font-bold text-gray-800 mb-4">Attendance (30 Days)</h2>
                
                {/* Stats Section */}
                <div className="space-y-2 mb-6 text-sm font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                        <span>✅ Present:</span>
                        <span className="text-black font-extrabold">{presentCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>⏳ Remaining:</span>
                        <span className="text-black font-extrabold">{remainingCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>📅 Total Days:</span>
                        <span className="text-black font-extrabold">30</span>
                    </div>
                </div>

                {/* Circles Grid (7 columns for neat desktop/mobile fit) */}
                <div className="grid grid-cols-7 gap-3 mb-8 justify-items-center">
                    {days.map((isPresent, index) => (
                        <button
                            key={index}
                            onClick={() => toggleDay(index)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 
                                ${isPresent 
                                    ? "bg-green-500 text-white shadow-lg ring-2 ring-green-300 scale-105" 
                                    : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end items-center gap-3 border-t pt-4">
                    <button 
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave}
                        className="px-8 py-2 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 shadow-md transition"
                    >
                        Save
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AttendanceModal;