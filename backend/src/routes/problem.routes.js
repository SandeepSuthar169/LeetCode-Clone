import express, { Router } from 'express'
import { 
    authMiddleware, 
    checkAdmin 
} from "../middlewares/auth.middleware.js"
import {  
    createProblem,
    getAllProblems,
    getProblemId,
    updateProblem,
    deleteProblem,
    getAllProblemByUser
} from "../controllers/problem.controllers.js"

 
const problemRoutes = Router()

problemRoutes.post("/create-problem", authMiddleware,checkAdmin, createProblem)
problemRoutes.get("/get-All-problem", authMiddleware, getAllProblems)
problemRoutes.get("/get-problem/:id", authMiddleware, getProblemId)
problemRoutes.put("/update-problem/:id", authMiddleware, checkAdmin, updateProblem)
problemRoutes.delete("/delete-problem/:id", authMiddleware, checkAdmin, deleteProblem)
problemRoutes.get("/get-solved-problems", authMiddleware, getAllProblemByUser)

export default problemRoutes