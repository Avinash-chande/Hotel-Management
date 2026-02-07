import mongoose, { Schema } from "mongoose";

const regularMenuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    portionType: {
        type: String,
        enum: ["limited", "unlimited"],
        required: true,
        default: "limited"
    },

    status: {
        type: String,
        enum: ["available", "unavailable"],
        default: "available"
    },
    isVisible: {
        type: Boolean,
        default: true
    },
    items: {
        type: [String], //  THIS IS IMPORTANT
        default: []
    }
}, { timestamps: true })

export const RegularMenu = mongoose.model("RegularMenu", regularMenuSchema)
