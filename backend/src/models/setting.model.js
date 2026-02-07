import mongoose from "mongoose";

const adminSettingsSchema = new mongoose.Schema(
  {
    hotelName: {
      type: String,
      required: true,
      default: "Hotel Dharmraj"
    },

    isOpen: {
      type: Boolean,
      default: true
    },

    /* ADMIN PROFILE (INSIDE SETTINGS) */
    adminName: {
      type: String,
      required: true
    },

    adminEmail: {
      type: String,
      required: true
    },

    adminMobile: {
      type: String,
      required: true
    },

    adminAvatar: {
      type: String, // image URL
      default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("AdminSettings", adminSettingsSchema);
