import { User } from "../models/user.model.js"
import { Problem } from "../models/problem.model.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const createProblem = asyncHandler(async(req, res) => {

})
const getAllProblems = asyncHandler(async(req, res) => {

})
const getProblemId = asyncHandler(async(req, res) => {

})
const updateProblem = asyncHandler(async(req, res) => {

})
const deleteProblem = asyncHandler(async(req, res) => {

})
const getAllProblemByUser = asyncHandler(async(req, res) => {

})


export {
    createProblem,
    getAllProblems,
    getProblemId,
    updateProblem,
    deleteProblem,
    getAllProblemByUser
}