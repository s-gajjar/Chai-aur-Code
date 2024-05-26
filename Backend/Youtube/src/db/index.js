import mongoose from 'mongoose'
import { DB_NAME } from './../constants.js';


export const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_DATABASE_URL}/Youtube`)
        console.log(`\n MongoDB Connected DB Host: ${connectionInstance.connection.host}`);
    }
    catch(error){
        console.log(`MONGODB CONNECTION ERROR ${error}`);
        process.exit(1)
    }
}