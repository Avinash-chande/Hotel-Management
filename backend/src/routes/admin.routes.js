import { Router } from "express";
import {
    register, loginUser, logOut

} from "../controllers/admin.controllers.js";

import { verifyJWT } from "../middleware/auth.middleware.js";
import { getDashboard, getStudentCount } from "../controllers/dashboard.js";



const router = Router()
router.route("/register").post(register)
router.route("/login").post(loginUser)
router.get("/dashboard/attendanceRate", getDashboard);
router.get("/count", getStudentCount);


// //secured route
router.route("/logout").post(verifyJWT, logOut)



export default router