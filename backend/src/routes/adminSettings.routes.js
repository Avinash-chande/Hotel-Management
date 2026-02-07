import express from "express";
import {
    getAdminSettings,
    updateAdminSettings
} from "../controllers/adminSettings.controllers.js";
import { isAdmin } from "../middleware/adminauth.middleware.js";

const router = express.Router();

router.get("/admin/settings", isAdmin, getAdminSettings);
router.put("/admin/settings", isAdmin, updateAdminSettings);

export default router;
