import mongoose from "mongoose";

const Schema=mongoose.Schema
//A schema define the structure of a document inside the 'Workout' collection
const workoutSchema = new Schema ({
    title:{
        type:String,
        required:true
    },
    reps:{//property to say the number of repetitions that we did this exercise 
        type:Number,
        required:true
    },
    load:{
        type:Number,
        required:true
    },
    user_id: {
        type:String,
        required:true
    }
},
{timestamps:true}
)
export default mongoose.model("Workout",workoutSchema)