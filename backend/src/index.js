import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./router/auth.routes.js"

dotenv.config(
    {
        path: "./.env"
    }
)

const app = express()
const PORT = process.env.PORT   || 8080


app.use(cookieParser)
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.send("hello i am sandeep suthar🔥");
})


app.use("/api/v1/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`Backend is listening at port${PORT}`);
    
})