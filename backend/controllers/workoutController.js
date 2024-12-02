import mongoose from 'mongoose';
import Workout from '../models/workoutModel.js';
 //get all workouts
export const getWorkouts = async (req, res) =>{
    try {
        const user_id = req.user._id
        const workouts = await Workout.find({user_id}).sort({createdAt: -1})
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
    
    const { title, load, reps } = req.body;

    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error:'Please fill in all the fields',emptyFields})
    }


    //add workout to db
    try{
        const user_id = req.user._id
        const workout = await Workout.create({title, load, reps, user_id})
        res.status(200).json(workout);
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