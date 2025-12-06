import express, { Router } from 'express'
import { authMiddleware, checkAdmin } from "../middlewares/auth.middleware.js"

const problemRoutes = Router()

problemRoutes.post("/create-problem", authMiddleware,checkAdmin, createProblem)

export default problemRoutes