import mongoose from "mongoose"

const settingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: Boolean,
    default: true
  }
})

export const Setting = mongoose.model("Setting", settingSchema)
