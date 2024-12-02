//In the HOME page component we fetch all the workouts
import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.js";
import { useAuthContext } from "../hooks/useAuthContext"

//components
import WorkoutDetails from "../components/WorkoutDetails.js";
import WorkoutForm from "../components/WorkoutForm.js";

const Home = () => {
  const {user} = useAuthContext()
  const { workouts, dispatch } = useWorkoutsContext();

 

  // the use effect going to fire the 'fetchWorkouts()' function when the component first renders
  useEffect(() => {
    //to fetch the workouts from the api 
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts',{
        headers: {'Authorization': `Bearer ${user.token}`},
      });
      const json = await response.json(); //parse the workouts response from the api (array of documents) into an array of objects
      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };
    if (user) {
      fetchWorkouts()
    }
  }, [dispatch,user]);



  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map( workout => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};
export default Home;
