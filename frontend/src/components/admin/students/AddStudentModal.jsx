import { useState } from "react";
import axios from "axios";
import { API } from "../../../api/api";
import { motion, AnimatePresence } from "framer-motion";

const AddStudentModal = ({ onClose }) => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.name || !form.mobile) {
      alert("Name and Mobile are required");
      return;
    }

    await axios.post(`${API}/students`, form);
    onClose();
    window.location.reload();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* ✅ Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        />

        {/* ✅ Modal */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Add Student</h3>
            <button
              onClick={onClose}
              className="text-red-500 text-xl hover:scale-110 transition"
            >
              ✕
            </button>
          </div>

          {/* FORM */}
          <div className="space-y-3">
            <input
              name="name"
              placeholder="Student Name"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              name="mobile"
              placeholder="Mobile Number"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Save
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddStudentModal;
