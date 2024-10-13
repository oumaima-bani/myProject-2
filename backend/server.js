import express from "express"
import dotenv from "dotenv";
import workoutRoutes from "./routes/workouts.js";
import mongoose from "mongoose";

dotenv.config();


//create express app
const app = express()

//middleware
app.use(express.json())//Parsing JSON Reque  
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})


//routes
app.use('/api/workouts',workoutRoutes)//this attaches all those routes of 'workouts.js' file to the app

//connect to db
mongoose.connect(process.env.MONGO_URI)//asynchronous function (it takes a little bit of time to do) and therefore it returns a promise
.then(()=>{
    //listen for requests
app.listen(process.env.PORT,()=>{
    console.log('connected to BD and listening on port ',process.env.PORT)
})
//this means we start listen for requests once we're connected on the database
})
.catch((error)=>{
    console.log(error)
})
