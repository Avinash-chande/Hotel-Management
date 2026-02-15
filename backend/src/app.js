import cookieParser from "cookie-parser";
import cors from 'cors'
import express from 'express'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser())



//import routes 
import adminRouter from './routes/admin.routes.js'
import menuRouter from './routes/menu.routes.js'
import regularMenuRouter from './routes/regularMenu.routes.js'

import AdminSettingsModal from "./routes/adminSettings.routes.js";
import studentRoutes from "./routes/student.routes.js";

//declare the routes

//this is open and closed app
app.use("/api", AdminSettingsModal);

//this is admin login
app.use("/api/auth", adminRouter)
app.use("/api/menu", menuRouter)
app.use("/api/regular-menu", regularMenuRouter)


app.use("/api/students", studentRoutes);



// //http://localhost:3000/api/v1/users/admin/register

export default app;
