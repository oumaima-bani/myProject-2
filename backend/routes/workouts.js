import express from "express";
const router = express.Router();

//GET all workouts
router.get('/',(req,res)=>{
    res.json({mssg:'GET all workouts'})
})

//GET a single workout
router.get('/:id',(req,res) =>{
    res.json({mssg: 'GET a single workout'})
})

//POST a new workout
router.post('/',(req,res)=>{
    res.json({mssg: 'POST a new workout'})
})

//DELETE a new workout
router.delete('/:id',(req,res)=>{
    res.json({mssg: 'DELETE a workout'})
})

//UPDATE a new workout
router.update('/:id',(req,res)=>{
    res.json({mssg: 'UPDATE a workout'})
})

//PATCH a new workout
router.patch('/:id',(req,res)=>{
    res.json({mssg: 'PATCH a  workout'})
})
export default router; 
