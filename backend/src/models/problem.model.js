import mongoose, { Schema } from "mongoose";
import { AvailableDifficulty, DifficultyEnum } from "../utils/constants.js";


const problemSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            lowercase: true
        },
        description: {
            type: String,
            required: true
        },
        difficulty: {
            type: String,
            enum: AvailableDifficulty,
            default: DifficultyEnum.EASY
        },
        tags: {
            type: [String],
            default: []
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        examples: {
            type: Object,
            required: true
        },
        constraints: {
            type: String,
            required: true
        },
        hints: {
            type: String,
        
        },
        editorial: {
            type: String,
        },
        testcases: {
            type: Schema.Types.Mixed,
            required: true
        },
        codeSnippets: {
            type: Schema.Types.Mixed,
            required: true
        },
        refrenseSolution: {
            type: Schema.Types.Mixed,
            required: true
        },
        createdAt: {
            type: Date,
            default: true
        },
        updatedAt: {
            type: Date,
            default: true
        },
        submission: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Submission" 
        },
        solvedBy: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "ProblemSolved" 
        },
        
        problemsPlaylists: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "ProblemInPlaylist" 
        },
    },
    {
        timestamps: true
    }
)


export const problem = mongoose.model("problem", problemSchema)