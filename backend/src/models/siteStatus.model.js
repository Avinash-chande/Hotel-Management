import mongoose from "mongoose"

const siteStatusSchema = new mongoose.Schema({
  siteStatus: {
    type: String,
    enum: ["open", "closed"],
    default: "open"
  }
})

export const SiteStatus = mongoose.model("SiteStatus", siteStatusSchema)
