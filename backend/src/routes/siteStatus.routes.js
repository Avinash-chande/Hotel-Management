import express from "express"
import { getSiteStatus, updateSiteStatus } from "../controllers/siteStatus.controllers.js";
import { isAdmin } from "../middleware/adminauth.middleware.js";

const router = express.Router()

router.route("/status").get(getSiteStatus)
router.route("/status").patch(isAdmin, updateSiteStatus)

export default router
