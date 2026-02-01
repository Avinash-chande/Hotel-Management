import { Menu } from "../models/menu.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js"
import ApiErrors from "../utils/ApiError.js"

// ADD MENU
const addMenu = asyncHandler(async (req, res) => {
    const { name, price, status, items } = req.body;

    if (!name || !price) {
        throw new ApiErrors(400, "Name and price are required");
    }

    const menu = await Menu.create({
        name,
        price,
        status,
        items
    });

    return res.status(201).json(
        new ApiResponse(201, menu, "Menu added successfully")
    );
});


// GET MENU (public)
const getMenu = async (req, res) => {
    const menu = await Menu.find().sort({ createdAt: -1 })

    if (!menu) {
        throw new ApiErrors(400, 'menu not found fetched')
    }
    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                menu,
            )
        )
}

// UPDATE MENU
const updateMenu = async (req, res) => {
    try {
        
        // console.log("BODY:", req.body) // DEBUG

        const { items, name, price, status } = req.body

        const updatedMenu = await Menu.findByIdAndUpdate(
            req.params.id,
            { items, name, price, status },
            { new: true }
        )

        res.status(200).json({
            success: true,
            data: updatedMenu,
            message: "Menu updated successfully"
        })
    } catch (error) {
        console.log("UPDATE ERROR:", error)
        res.status(500).json({ success: false, error: error.message })
    }
}

// DELETE MENU
const deleteMenu = asyncHandler(async (req, res) => {
    const menu = await Menu.findByIdAndDelete(req.params.id);

    if (!menu) {
        throw new ApiErrors(404, "Menu not found");
    }

    return res.status(200).json(
        new ApiResponse(200, null, "Menu deleted successfully")
    );
});


export {
    addMenu,
    getMenu,
    updateMenu,
    deleteMenu
}