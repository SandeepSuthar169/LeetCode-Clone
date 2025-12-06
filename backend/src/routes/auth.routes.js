import { Router } from "express"
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controllers.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = Router()


router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout",authMiddleware,  logoutUser )

export default router
