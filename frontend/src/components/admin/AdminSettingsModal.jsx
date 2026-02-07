import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { API } from "../../api/api.js";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Settings</h2>
          <button onClick={onClose}>
            <X className="text-red-500" />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4">

          <div>
            <label className="text-sm font-semibold">Hotel Name</label>
            <input
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Admin Name</label>
            <input
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Admin Email</label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Mobile Number</label>
            <input
              value={adminMobile}
              onChange={(e) => setAdminMobile(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          {/* HOTEL STATUS */}
          <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
            <span className="font-semibold">Hotel Status</span>

            <button
              onClick={toggleHotelStatus}
              className={`px-4 py-1 rounded-full text-sm font-bold text-white
                ${hotelOpen ? "bg-green-500" : "bg-red-500"}
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
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsModal;
