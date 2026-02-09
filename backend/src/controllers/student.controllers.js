import Student from "../models/student.model.js";

/* 1️. Add new student */
export const createStudent = async (req, res) => {
    try {
        const { name, mobile, email, address } = req.body;

        if (!name || !mobile) {
            return res.status(400).json({ message: "Name and mobile are required" });
        }

        const student = await Student.create({
            name,
            mobile,
            email,
            address,
        });

        res.status(201).json({
            success: true,
            student,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* 2️. Get all students */
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            students,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
