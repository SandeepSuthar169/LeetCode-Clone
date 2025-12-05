import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import authRoute from "./routes/auth.routes.js"


const app = express()

app.use(cors({
    origin: process.env.BASE_URL || `http://localhost:8000`,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ['Content-Type', "Authorization"]
})),
app.use(express.json())
app.use((cookieparser()))
app.use(express.urlencoded(
    {
        extended: true
    }
))

app.use("/api/v1/auth", authRoute)


export default app
