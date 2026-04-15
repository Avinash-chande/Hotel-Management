import express from "express";
import {
    getAdminSettings,
    updateAdminSettings
} from "../controllers/adminSettings.controllers.js";
import { isAdmin } from "../middleware/adminauth.middleware.js";

const router = express.Router();

router.get("/admin/settings", getAdminSettings);
router.put("/admin/settings", updateAdminSettings);

export default router;
