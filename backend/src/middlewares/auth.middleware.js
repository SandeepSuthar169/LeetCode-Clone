import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import {UserRoleEnum, AvailableUserRoles} from "../utils/constants.js"
import mongoose from "mongoose";
import { registerUser } from "../controllers/auth.controllers.js";

export const authMiddleware = asyncHandler(async (req, _, next) => {   // req, res, === req, _, 
try {
      const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
      if(!token){
        throw new ApiError(401, "Unauthorized request")
      }
    
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
      if(!decodedToken){
        throw new ApiError(401, "Invalid Access token")
      }
    
      const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
      if(!user){
        throw new ApiError(401, "Invalid Access token")
      }
    
      req.user = user;
      next()

} catch (error) {
    throw new ApiError(401, "Invalid access token")
}
})


export const checkAdmin = asyncHandler(async (req, res, next) => {
  try {

      const pipeline = [
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $project: {
                role: 1,
                _id: 0
            }
        }
    ];


    const users = await User.aggregate(pipeline);


      if(!users || users.role !== 'ADMIN'){
          throw new ApiError(403, 'Acess denied - Admins only')
      }

  } catch (error) {
    console.error('Error checking admin role', error);
    throw new ApiError(500, 'Error checking admin role')
    
  }
}) 