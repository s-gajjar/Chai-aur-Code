// require('dotenv').config({ path: "./env"})
import dotenv from 'dotenv'
import { connectDB } from './db/index.js'

dotenv.config({
    path: "./env"
})

connectDB()


// ;( async ()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_DATABASE_URL}/${DB_NAME}`)
//         app.on("error", (error)=>{
//             console.log("Error: ", error);
//             throw error
//         })

//         app.listen(process.env.PORT, ()=>{
//             console.log(`App is listening on post ${process.env.PORT}`);
//         })
//     }catch(e){
//         console.log("ERROR",e);
//         throw err
//     }
// })()