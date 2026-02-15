import express from "express";
import {
    createStudent, getAllStudents,  updateStudent,
    deleteStudent, updateAttendance
} from "../controllers/student.controllers.js";

const router = express.Router();

router.post("/", createStudent);   // add student
router.get("/", getAllStudents);    // list of students
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
// router.get("/count", getStudentCount);
router.put('/:id/attendance', updateAttendance);


export default router;
