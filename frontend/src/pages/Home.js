import {useEffect, useState} from 'react'
//components
import WorkoutDetails from '../components/WorkoutDetails.js'
import WorkoutForm from '../components/WorkoutForm.js'

const Home =()=>{
const[workouts, setWorkouts] = useState(null)
    // the use effect going to fire the 'fetchWorkouts()' function when the component first renders
    useEffect(() =>{//to fetch the workouts from the api in the backend 
        const fetchWorkouts = async() =>{
            const response = await fetch('/api/workouts')
            const json = await response.json()//parse the workouts response from the api (array of documents) into an array of objects
            if(response.ok){
                setWorkouts(json)
            }
        }
        fetchWorkouts()
    },[])
    return(
        <div className="home">
            <div className="workouts">
                 {workouts && workouts.map((workout) =>(
                    <WorkoutDetails key={workout._id} workout={ workout}/>
                 ))}
            </div>
            <WorkoutForm />
        </div>
    )
}
export default Home; 