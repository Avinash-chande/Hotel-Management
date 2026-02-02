import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
import asyncHandler from '../utils/asyncHandler.js'
import ApiErrors from '../utils/ApiError.js'


export const isAdmin = asyncHandler(async (req, res, next) => {

    const authHeader = req.header("Authorization")
    const token =
        req.cookies?.accessToken ||
        (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null)

    console.log(token)

    if (!token) {
        throw new ApiErrors(401, "Unauthorized request")
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    // console.log(decodedToken)

    const user = await User.findById(decodedToken._id)
    // console.log(user)

    if (!user) {
        throw new ApiErrors(400, 'user not found')
    }
    if (user.role !== "admin") {
        throw new ApiErrors(403, 'Unauthorized : User is not admin')
    }

    req.user = user
    next()
})