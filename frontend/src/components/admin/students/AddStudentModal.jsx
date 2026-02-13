import { useState } from "react";
import axios from "axios";
import { API } from "../../../api/api";

const AddStudentModal = ({ onClose }) => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    address: ""
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
    onClose(); // close modal after save
    window.location.reload(); // or refetch students
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* BLUR BACKGROUND */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 z-10">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Add Student</h3>
          <button onClick={onClose} className="text-red-500 text-xl">✕</button>
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
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;
