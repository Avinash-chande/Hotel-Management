import express from "express";
import { createStudent, getAllStudents } from "../controllers/student.controllers.js";

const router = express.Router();

router.post("/", createStudent);   // add student
router.get("/", getAllStudents);    // list students

export default router;
