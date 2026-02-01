// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connecteDB from "./db/index.js";
import express from 'express'
import app from "./app.js";

dotenv.config({
    path: './.env'
})

connecteDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Connection Done  at the port ${process.env.PORT}`)
        }
        )
    }
    )
    .catch((err) => {
        console.log("db connection error !!", err);
    }
    )



/*
import express from 'express'
const app = express()
    (async () => {
        try {
            mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
            app.on("error" ,() => {
                console.log("ERROR" ,error)  
            })

            app.listen(process.env.PORT ,() => {
              console.log(`excuted at port : ${process.env.PORT}`)
            } )

        } catch (error) {
            console.log("coonection error", error);
            throw error
        }
    }
    )()

    */