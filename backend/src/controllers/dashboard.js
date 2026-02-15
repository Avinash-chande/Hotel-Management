import Student  from '../models/student.model.js';


//this is attendance rate
export const getDashboard = async (req, res) => {
    try {
        const students = await Student.find();

        const totalStudents = students.length;

        let totalAttendance = 0;
        const totalPossible = totalStudents * 30;

        students.forEach(student => {
            totalAttendance += student.attendanceCount || 0;
        });

        const attendanceRate = totalStudents === 0
            ? 0
            : Math.round((totalAttendance / totalPossible) * 100);

        res.json({
            totalStudents,
            attendanceRate
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Get student count
export const getStudentCount = async (req, res) => {
    try {
        const count = await Student.countDocuments();
        res.json({ success: true, count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};