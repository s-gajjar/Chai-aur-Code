import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from './../utils/ApiError.js';
import { User } from './../models/user.model.js';
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

const generateAccessandRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        if (!accessToken || !refreshToken) {
            throw new ApiError(500, "Failed to generate tokens");
        }

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error(`Error generating tokens: ${error.message}`);
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
};


export const registerUser = asyncHandler(async (req, res) => {

 //get user from frontend
    //validation - not empty
    //check if user already exists: username & email id se
    //check for images, check for avatar
    //upload them to cloudinary, avatar
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return response


    try {
        const { fullName, email, password, username } = req.body;

        console.log(`FullName: ${fullName}`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log(`Username: ${username}`);

        if ([fullName, email, password, username].some((field) => field?.trim() === "")) {
            throw new ApiError(400, "All fields are required");
        }

        const existedUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existedUser) {
            throw new ApiError(409, "User with email or username already exists");
        }

        let avatarLocalPath;
        if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
            avatarLocalPath = req.files.avatar[0].path;
        }

        let coverImageLocalPath;
        if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
            coverImageLocalPath = req.files.coverImage[0].path;
        }

        if (!avatarLocalPath) {
            throw new ApiError(400, "Avatar is needed");
        }

        const avatar = await uploadCloudinary(avatarLocalPath);
        const coverImage = coverImageLocalPath ? await uploadCloudinary(coverImageLocalPath) : null;

        if (!avatar) {
            throw new ApiError(400, "Failed to upload avatar");
        }

        const user = await User.create({
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username
        });

        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering user!");
        }

        return res.status(201).json(
            new ApiResponse(200, createdUser, "User is successfully registered!!!")
        );

    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(error.statusCode || 500).json({
            message: error.message || "Internal Server Error"
        });
    }
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if (!username && !email) {
        return res.status(400).json({ message: "username or email is required" });
    }

    try {
        const user = await User.findOne({ $or: [{ username }, { email }] });

        if (!user) {
            throw new ApiError(404, "User not found!");
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            throw new ApiError(401, "Password not valid!");
        }

        const { accessToken, refreshToken } = await generateAccessandRefreshTokens(user._id);
        

        if (!accessToken || !refreshToken) {
            throw new ApiError(500, "Token generation failed!");
        }

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const options = {
            httpOnly : true,
            secure: true
        } 

        // Directly respond with the tokens and user details
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                statusCode: 200,
                data: {
                    user: loggedInUser,
                    accessToken: await accessToken,
                    refreshToken: await refreshToken
                },
                message: "User logged in successfully",
                success: true
            });

    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(error.statusCode || 500).json({
            message: error.message || "Internal Server Error"
        });
    }
});


export const logoutUser = asyncHandler(async (req, res) => {
    try {
        // Find and update the user to clear the refreshToken
        await User.findByIdAndUpdate(req.user._id, {
            $set: {
                refreshToken: null
            }
        }, {
            new: true
        });

        // Define cookie options
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict', // Ensure the cookie is only sent in requests originating from the same site
            path: '/' // Ensure the path is the same as where the cookie was set
        };

        // Clear cookies
        res.clearCookie("accessToken", options);
        res.clearCookie("refreshToken", options);

        // Send response
        return res.status(200).json(new ApiResponse(200, {}, "User logged out"));
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(error.statusCode || 500).json({
            message: error.message || "Internal Server Error"
        });
    }
});

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

export const getUserChannelProfile = asyncHandler(async(req,res)=>{
    const {username} = req.params
    if (!username?.trim()) {
        throw new ApiError(400, "Username from parameter is missing")
    }

    const channel = await User.aggregate([
            {
                $match:{
                    username: username?.toLowerCase()
                }
            },
            {
                $lookup:{
                    from: "subscriptions",
                    localField: "_id",
                    foreignField: "channel",
                    as: "subscribers"
                }
            },
            {
                $lookup:{
                    from: "subscriptions",
                    localField: "_id",
                    foreignField: "subscriber",
                    as: "subscribedTo"
                }
            },
            {
                $addFields:{
                    subscribersCount: {
                        $size: "$subscribers"
                    },
                    channelsSubscribedToCount:{
                        $size: "$subscribedTo"
                    },
                    isSubscribed: {
                        $cond: {
                            if : {$in : [req.user?._id, "$subscribers.subscriber"]},
                            then : true,
                            else: false
                        }
                    }
                }
            },
            {
                $project:{
                    fullName: 1,
                    username: 1,
                    subscribersCount: 1,
                    channelsSubscribedToCount: 1,
                    isSubscribed: 1,
                    avatar: 1,
                    coverImage: 1,
                    email: 1
                }
            }
    ])

    if (!channel?.length) {
        throw new ApiError(404, "channel doesnt exist")
    }

    return res.status(200).json(new ApiResponse(200,channel[0], "User Channel Fetched Successfully"))

})

export const getWatchHistory = asyncHandler(async(req,res)=>{
    const user = await User.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup:{
                from : "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline:[
                    {
                        $lookup:{
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline:[
                                {
                                    $project:{
                                        fullName: 1,
                                        username: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields:{
                            owner:{
                                $first: "$owner"
                            }
                        }
                    }
                ]
                
            }
        }
    ])

    res.status(200).json(new ApiResponse(200, user[0].watchHistory, "Watch History fetched Successfully"))
})