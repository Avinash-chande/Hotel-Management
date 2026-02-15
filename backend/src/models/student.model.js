import mongoose from "mongoose";
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    email: {
      type: String,
      trim: true,
      lowercase: true
    },

    address: {
      type: String,
      trim: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    attendanceArray: {
      type: [Boolean],
      default: new Array(30).fill(false)
    },

    // Derived value for the "X / 30" display
    attendanceCount: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Student", studentSchema);
