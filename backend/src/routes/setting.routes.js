import express from "express"
import { toggleHardcodedMenu } from "../controllers/setting.controller.js"
import { isAdmin } from "../middleware/adminauth.middleware.js"

const router = express.Router()

router.route("/admin/toggle-hardcoded-menu").put(isAdmin, toggleHardcodedMenu)

export default router
