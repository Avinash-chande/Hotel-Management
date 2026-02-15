import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { API } from "../../api/api.js";
import { motion, AnimatePresence } from "framer-motion";

const AdminSettingsModal = ({ isOpen, onClose }) => {
  const [hotelName, setHotelName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminMobile, setAdminMobile] = useState("");

  const [hotelOpen, setHotelOpen] = useState(true);
  const [saving, setSaving] = useState(false);

  /* 🔹 LOAD DATA WHEN MODAL OPENS */
  useEffect(() => {
    if (!isOpen) return;

    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${API}/admin/settings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        });

        setHotelName(res.data.hotelName);
        setAdminName(res.data.adminName);
        setAdminEmail(res.data.adminEmail);
        setAdminMobile(res.data.adminMobile);
        setHotelOpen(res.data.isOpen);
      } catch (err) {
        console.error("Failed to load settings", err);
      }
    };

    fetchSettings();
  }, [isOpen]);

  if (!isOpen) return null;

  /* 🔹 TOGGLE = UI ONLY */
  const toggleHotelStatus = () => {
    setHotelOpen(prev => !prev);
  };

  /* 🔹 SAVE = BACKEND UPDATE */
  const handleSave = async () => {
    try {
      setSaving(true);

      await axios.put(
        `${API}/admin/settings`,
        {
          hotelName,
          adminName,
          adminEmail,
          adminMobile,
          isOpen: hotelOpen
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );

      onClose(); // close modal after success
    } catch (error) {
      console.error("Failed to save settings", error);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };



  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
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
          className="relative bg-white w-full max-w-md rounded-xl shadow-xl p-6 will-change-transform"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              Settings
            </h2>

            <button
              onClick={onClose}
              className="text-red-500 hover:scale-110 transition"
            >
              <X />
            </button>
          </div>

          {/* FORM */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold">
                Hotel Name
              </label>
              <input
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Admin Name
              </label>
              <input
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Admin Email
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Mobile Number
              </label>
              <input
                value={adminMobile}
                onChange={(e) => setAdminMobile(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            {/* HOTEL STATUS */}
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <span className="font-semibold">
                Hotel Status
              </span>

              <button
                onClick={toggleHotelStatus}
                className={`px-4 py-1 rounded-full text-sm font-bold text-white transition
                ${hotelOpen
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                  }
              `}
              >
                {hotelOpen ? "OPEN" : "CLOSED"}
              </button>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

};

export default AdminSettingsModal;
