import mongoose from "mongoose";
import { DB_NAME } from '../constants.js'


const connecteDB = async () => {
    try {
        const connectionInstant = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`DB connected ${DB_NAME}  || HOST At ${connectionInstant.connection.host}`)

    } catch (error) {
        console.log("error in db connection", error);
        process.exit(1)

    }
}

export default connecteDB