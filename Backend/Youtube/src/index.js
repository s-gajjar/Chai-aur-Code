// require('dotenv').config({ path: "./env"})
import dotenv from 'dotenv'
import { connectDB } from './db/index.js'
import { app } from './app.js';

dotenv.config({
    path: "./env"
})

const PORT = process.env.PORT || 8000;

connectDB()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running at port : ${PORT}`);
    });
})
.catch((err)=>{
    console.log(`Mongo DB connection failed whopps ${err}`);
})


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