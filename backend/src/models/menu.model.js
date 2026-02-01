import mongoose, { Schema } from "mongoose";

const menuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["available", "limited", "unavailable"],
        default: "available"
    },
    items: {
        type: [String], //  THIS IS IMPORTANT
        default: []
    }
}, { timestamps: true })

export const Menu = mongoose.model("Menu", menuSchema)
