import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from './../utils/ApiError.js';
import { User } from './../models/user.model.js';
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerUser = asyncHandler(async(req, res)=>{

    //get user from frontend
    //validation - not empty
    //check if user already exists: username & email id se
    //check for images, check for avatar
    //upload them to cloudinary, avatar
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return response

    const {fullName, email, password, username} = req.body
    console.log(`FullName : ${fullName}`);

    if (
        [fullName, email, password, username].some((field)=>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

     const existedUser = await User.findOne({
        $or: [{email}, {username}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }
  
    //const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;
   

    let avatarLocalPath
    if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        req.files?.avatar[0]?.path;
    }


    let coverImageLocalPath
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is needed")
    }
    const avatar = await uploadCloudinary(avatarLocalPath)
    const coverImage = await uploadCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar is needed upload me")
    }

    const user = await User.create({
        fullName,
        avatar : avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user!")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User is successfully registered!!!")
    )

})

