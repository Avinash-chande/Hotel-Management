import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js';
import { User } from '../models/admin.model.js'
import ApiResponse from '../utils/ApiResponse.js'
import Students from '../models/student.model.js';

export const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new Error("User not found")
        }

        const accessToken = user.generateAccessToken()

        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        //  MUST return both
        return { accessToken, refreshToken }

    } catch (error) {
        console.error("TOKEN GENERATION ERROR:", error)
        throw new Error("Failed to generate tokens")
    }
}

export const register = asyncHandler(async (req, res) => {
    // 1. get user's detali's from frontend
    // 2. valdtion -no empty
    // 3. check user is already exist or not through- username , email
    // 6. create a user object - create a entry in databse
    // 7.  remove password and refresh token field from response
    // 8.  check for user ceration if created return response

    const { name, password, email } = req.body

    //2.
    if (
        [name, password, email].some((field) =>
            field?.trim() === "")    //trim() removes extra spaces from start and end
    ) {
        throw new ApiError(400, 'All field are required ')
    }

    //3:
    const exitedUser = await User.findOne({ email })

    if (exitedUser) {
        throw new ApiError(409, 'User with this email or username already exist')
    }

    //6.
    const user = await User.create({
        name,
        email,
        password,
    });

    //7
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, 'something went wrong while registering the user')
    }
    //8
    return res.status(201).json(
        new ApiResponse(
            201,
            createdUser,
            "User created successfully!"
        )
    );
})

export const loginUser = asyncHandler(async (req, res) => {
    // 1 req.body -> data
    // 2 username or email
    // 3 find the user
    // 4 password check 
    // 5 access and refresh token
    // 6 send cookie
    // 7 response


    //1
    const { password, email } = req.body || {}
    console.log(email);

    //2
    if (!email) {
        throw new ApiError(400, 'email is required')

    }
    //3
    const exitedUser = await User.findOne({ email })

    if (!exitedUser) {
        return res.status(404).json({
            success: false,
            message: "Email not found"
        });
    }
    // console.log("BODY:", req.body)
    // console.log("password:", password)
    // console.log("USER:", exitedUser)
    // console.log("DB password:", exitedUser?.password)


    //4
    const ispasswordCorrect = await exitedUser.ispasswordCorrect(password)

    if (!ispasswordCorrect) {
        return res.status(404).json({
            success: false,
            message: "password is wrong please try again"
        });

    }

    //5
    const { refreshToken, accessToken } = await generateAccessTokenAndRefreshToken(exitedUser._id)

    //these line are option it show all value except pass, refreshToken
    const loggedInUser = await User.findById(exitedUser._id).select("-password -refreshToken")

    //6 :because of this line's we can't modify cookie on forntend
    const option = {
        httpOnly: true,
        secure: true,
    }
    //7

    return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                'user loggedIn successFully...!'
            )
        )


})

export const logOut = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )
    const option = {
        httpOnly: true,
        secure: true,
    }
    return res
        .status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json(new ApiResponse(200, {}, "User logged out"))
})


export const getDashboard = async (req, res) => {
    try {
        const students = await Student.find();

        let totalPresents = 0;
        const totalPossible = students.length * 30;

        students.forEach(student => {
            const presents = student.attendance.filter(
                a => a.status === "Present"
            ).length;

            totalPresents += presents;
        });

        const attendanceRate = Math.round(
            (totalPresents / totalPossible) * 100
        );

        res.json({
            totalStudents: students.length,
            attendanceRate
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



