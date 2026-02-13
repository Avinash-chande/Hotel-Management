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

//  Update student
export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await Student.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//  Delete student
export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        await Student.findByIdAndDelete(id);

        res.json({ message: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getStudentCount = async (req, res) => {
    try {
        const count = await Student.countDocuments();
        res.json({ success: true, count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
