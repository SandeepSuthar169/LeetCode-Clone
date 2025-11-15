import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import mongoose, { Schema } from "mongoose";
import { AvailableUserRoles, UserRoleEnum } from "../utils/constants.js";


const userSchema = new Schema(
    {
            username: {
                type: String,
                required: true,
                unique: true,
                lowercase: true,
                trim: true
            },
            email: {
                type: String,
                required: true,
                unique: true,
                lowercase: true,
                trim: true
            },
            role: {
                type: String,
                enum: AvailableUserRoles,
                default: UserRoleEnum.USER
            },
            password: {
                type: String,
                required: true
            },
            isEmailVerified: {
                type: String,
                required: true,
                default: true
            },
            refreshToken: {
                type: String,
            },
            forgotPasswordToken: {
                type: String,
            },
            forgotPasswordExpiry: {
                type: Date,
            },
            emailVerificationToken: {
                type: String,
            },
            emailVerificationExpiry: {
                type: Date,
            },
            problems: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Problem" 
            }],
            submission: [{ 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Submission" 
            }],
            problemSolved: [{ 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "ProblemSolved" 
            }],
            playlists: [{ 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Playlist" 
            }],
        },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken =  function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPRIRY },
    )
}

userSchema.methods.generateRefreshToken =  function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPRIRY },
    )
}

userSchema.methods.generateTemporyToken = function(){
    const unHashedToken = crypto.randomBytes(20).toString("hex")

    const hashedToken = crypto.createHash("sha256").update(unHashedToken).digest("hex")

    const tokenExpiry = Date.now() + (20 * 60 * 1000) // 20min

    return { unHashedToken, hashedToken, tokenExpiry }

}
export const User = mongoose.model("User", userSchema)
