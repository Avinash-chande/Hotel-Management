import cookieParser from "cookie-parser";
import cors from 'cors'
import express from 'express'

const app = express();

app.use(cors({
    origin: process.env.CORD_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser())

//import routes
import userRouter from './routes/user.routes.js'
import menuRouter from './routes/menu.routes.js'

//declare the routes
app.use("/api/auth", userRouter)
app.use("/api/menu", menuRouter)


// //http://localhost:3000/api/v1/users/admin/register

export default app;
