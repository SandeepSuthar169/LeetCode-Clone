import { User } from "../models/user.model.js"
import { Problem } from "../models/problem.model.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { 
    getJudge0LanguageId, 
    pollBatchResults, 
    submitBatch 
} from "../db/judge0.db.js"



const createProblem = asyncHandler(async(req, res) => {
    // goging to get all problem data from request body
    const {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolution
    } = req.body

    if(!title || !description || !difficulty || !tags || !examples ||!constraints || !testcases || !codeSnippets || !referenceSolution) throw new ApiError(401, "problem schema is requred")
    
    //going t check the role of user again check
    if(req.user.role !== "ADMIN") throw new ApiError(403, "You are not create a problem. ")
    


    // Loop through each refrence solution for diffrent languages.
    try {
        for(const [language, solutionCode] of Object.entries(referenceSolution)){

            const languageId = getJudge0LanguageId(language)
            if(languageId) throw new ApiError(401, `Language ${languageId} is not supported`)

            const submissions = testcases.map((input, output) => ({
                source_code:solutionCode,
                language_id: languageId,
                stdin:input,
                expected_output:output
            }))

            const submissionResults = await submitBatch(submissions)

            const tokens = submissionResults.map((res) => res.token)

            const results = await pollBatchResults(tokens)

            for(let i = 0; i < results.length; i++){
                const result = results[i]

                if(result.status.id !== 3) throw new ApiError(400, `Testcase ${i+1} failed for language ${language}`)
            }


            // save the problem to the database;

            const newProblem = await Problem.create({
                title,
                description,
                difficulty,
                tags,
                examples,
                constraints,
                testcases,
                codeSnippets,
                referenceSolution,
                userId: req.user._id
            })

            return res.status(200).json(
                new ApiResponse(200, {
                    newProblem
                })
            )
        }
    } catch (error) {
        console.error(`create problem using through error, $${error}`);      
    }



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