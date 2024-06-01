import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from './../utils/ApiError.js';
import { User } from './../models/user.model.js';
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken';

const generateAccessandRefreshTokens = async(userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong! while generating refresh and access token")
    }
}

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

export const loginUser = asyncHandler(async(req, res)=>{
    //TODO
    // req body se data lao
    // username or email se login?
    // find the user
    // password check
    // access & refresh token generate karke user ko bhejo
    // send in cookies

    const {email, username, password} = req.body
    if (!username || !email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
       $or: [{username}, {email}]
    })
    if(!user){
        throw new ApiError(404, "User not found!")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401, "Password not valid!")
    }

    const {accessToken, refreshToken} = await generateAccessandRefreshTokens(user._id)
    
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly : true,
        secure: true
    }
    return res.status(200).
    cookie("accessToken", accessToken, options).
    cookie("refreshToken", refreshToken, options).
    json(
        new ApiResponse(200,{
            user: loggedInUser, accessToken, refreshToken
        }),
        "User logged in successfully"
    )


})

export const logoutUser = asyncHandler(async(req, res)=>{
    await User.findByIdAndUpdate(req.user._id,
        {
            $set:{
                refreshToken: undefined
            }
        },
        {
            new: true   //new res me new updated value ayegi
        })
    const options = {
        httpOnly : true,
        secure: true
    }       
    return res.status(200).clearCookies("accessToken", options).clearCookies("refreshToken", options).json(new ApiResponse(200, {}, "User logged out"))
})

export const refreshAccessToken = asyncHandler(async(req, res)=>{
    try {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
        
        if(!incomingRefreshToken) throw new ApiError(401, "Unauthorized Access")
    
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)  //refresh token is in database
        
        const user = await User.findById(decodedToken?._id)
        if(!incomingRefreshToken) throw new ApiError(401, "Invalid Refresh Token")
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh Token is expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessandRefreshTokens(user._id)
    
    
        return res.status(200).cookie("accesstoken", accessToken, options).cookie("refreshtoken", newRefreshToken, options).
        json(new ApiResponse(200, {accessToken, newRefreshToken}, "Access token refreshed"))
    } catch (error) {
        new ApiError(401, error?.message || "error creating refreshAccessToken")
    }

}) 

export const changeCurrentPassword = asyncHandler(async(req, res)=>{
    const {oldPassword, newPassword} = req.body;

    const user = await User.findById(req.user?._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Password")
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false})

    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"))
})

export const getCurrentUser = asyncHandler(async(req, res)=>{
    return res.status(200).json(200, req.user, "Current User fetched Successfully")
})

export const updateAccountDetails = asyncHandler(async(req,res)=>{
    const {fullName, email} = req.user;
    
    if (!fullName || !email) {
        throw new ApiError(400, "All field are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id, 
        { 
            $set:{
                fullName, email
            } 
        }, 
        {   new : true

        }).select("-password")

    return res.status(200).json(new ApiResponse(200, user, "Details updated Successfully"))
})

export const updateAvatar = asyncHandler(async(req, res)=>{

    const avatarlocalPath = req.file?.path
    if (!avatarlocalPath) {
        throw new ApiError(400, "Avatar file missing")
    }

    const avatar = await uploadCloudinary(avatarlocalPath)
    if (!avatar.url) {
        throw new ApiError(400, "error while uploading avatar")
    }

    const user = await User.findByIdAndUpdate(req.user?._id,
    {
        $set:{
            avatar : avatar.url
        }
    },{
        new: true
    }).select("-password")

    return res.status(200).json(new ApiResponse(200, user, "Avatar updated Successfully"))

})

export const updateCoverImage = asyncHandler(async(req, res)=>{

    const coverlocalImagePath = req.file?.path
    if (!coverlocalImagePath) {
        throw new ApiError(400, "Cover Image file missing")
    }

    const coverImage = await uploadCloudinary(coverlocalImagePath)
    if (!coverImage.url) {
        throw new ApiError(400, "error while uploading cover image")
    }

    const user = await User.findByIdAndUpdate(req.user?._id,
    {
        $set:{
            coverImage : coverImage.url
        }
    },{
        new: true
    }).select("-password")

    return res.status(200).json(new ApiResponse(200, user, "Cover Image updated Successfully"))

})
