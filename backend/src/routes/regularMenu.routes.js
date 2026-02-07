import { isAdmin } from '../middleware/adminauth.middleware.js'
import { Router } from "express";
import {
    addMenu,
    getMenu,
    updateMenu,
    deleteMenu,
    toggleMenuVisibility,
} from '../controllers/regularMenu.controllers.js'
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router()

router.route("/").get(getMenu)//public

router.route("/").post(isAdmin, addMenu)
router.route("/:id").put(isAdmin, updateMenu)
router.route("/:id").delete(isAdmin, deleteMenu)
router.route("/toggle-visibility/:id").patch(verifyJWT, isAdmin, toggleMenuVisibility)

export default router
