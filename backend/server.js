import express from "express";
import dotenv from "dotenv";
import workoutRoutes from "./routes/workouts.js";
import userRoutes from "./routes/user.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

dotenv.config();
//create express app
const app = express();

//middleware
app.use(cookieParser());
app.use(express.json()); //Parsing JSON Reque
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes); //this attaches all those routes of 'workouts.js' file to the app
app.use("/api/user", userRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
    console.log("Connected on port :",process.env.PORT)
    })
})
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    console.error("Error cause:", error.cause);
  });

