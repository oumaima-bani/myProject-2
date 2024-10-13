 import Workout from "../models/workoutModel.js";
 
 //get all workouts
export const getWorkouts = async (req, res) =>{
    try {
        const workouts = await Workout.find({}).sort({createdAt: -1})
        res.status(200).json(workouts)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    
} 

 //get a single workout
export const getWorkout = async(req,res) =>{
    try {
        const workout = await Workout.findById(req.params.id); 
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message });
    
    }
    
}
 // create new workout
export const createWorkout = async(req,res)=>{
    
    const newWorkout = new Workout(req.body);
    //add workout to db
    try{
        const savedWorkout = await newWorkout.save();
        res.status(200).json(savedWorkout);
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}
 //delete a workout
export const deleteWorkout= async(req,res) =>{
    try {
        const deleteWorkout = await Workout.findByIdAndDelete(req.params.id);
        res.status(200).json("Workout has been deleted");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
 //update a workout

 export const updateWorkout = async (req,res) =>{
    try {
        const updateWorkout = await Workout.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateWorkout );

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
 }