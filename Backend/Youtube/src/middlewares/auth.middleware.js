import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';

// Use JWT methods directly
const { verify } = jwt;

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token = req.cookies?.accessToken ?? req.header("Authorization")?.replace("Bearer ", "");

        console.log("Token:", token);

        // If no token is provided, throw an error
        if (!token) {
            throw new ApiError(401, "Unauthorized Access");
        }

        // Verify token
        const decodedToken = verify(token, process.env.ACCESS_TOKEN_SECRET);

        console.log("Decoded Token:", decodedToken);

        // Find the user by decoded token ID
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        console.log("User:", user);

        // If no user is found, throw an error
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        console.error("Error:", error);
        next(new ApiError(401, error?.message || "Invalid Access token..."));
    }
});
