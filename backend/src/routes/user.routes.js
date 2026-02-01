import { Router } from "express";
import {
    register, loginUser, logOut
    //    , refreshAccessToken,
    // changeUserPassword,
    // getCurrentUser,
    // updateUserDetalis
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";



const router = Router()
router.route("/register").post(register)
router.route("/login").post(loginUser)


// //secured route
router.route("/logout").post(verifyJWT, logOut)
// router.route("/refresh-token").post(refreshAccessToken)
// router.route("/change-password").post(verifyJWT, changeUserPassword)
// router.route("/current-user").get(verifyJWT, getCurrentUser)
// router.route("/update-account").patch(verifyJWT, updateUserDetalis)


export default router