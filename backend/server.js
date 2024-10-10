import express from "express"
import dotenv from "dotenv";
import workoutRoutes from "./routes/workouts.js";

//create express app
const app = express()

//middleware
app.use(express.json())//Parsing JSON Requests 
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})
//routes
app.use('/api/workouts',workoutRoutes)//this attaches all those routes of 'workouts.js' file to the app

//listen for requests
app.listen(process.env.PORT,()=>{
    console.log('listening on port ',process.env.PORT)
})