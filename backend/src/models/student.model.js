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
  }, {
  timestamps: true
}
);

export default mongoose.model("Student", studentSchema);
