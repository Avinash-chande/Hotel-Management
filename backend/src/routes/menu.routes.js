import { isAdmin } from '../middleware/adminauth.middleware.js'
import { Router } from "express";
import {
    addMenu,
    getMenu,
    updateMenu,
    deleteMenu,
} from '../controllers/menu.controllers.js'

const router = Router()

router.route("/").get(getMenu)//public

router.route("/").post(isAdmin, addMenu)
router.route("/:id").put(isAdmin, updateMenu)
router.route("/:id").delete(isAdmin, deleteMenu)

export default router
