//In this component we create a new workout 
import { useState} from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext.js';
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const { dispatch }= useWorkoutsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const[emptyFields,setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!user) {
      setError('You must be logged in')
      return
    }


    const workout = { title, reps, load };

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${user.token}`

      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null);
      setEmptyFields([])
      setTitle("");
      setReps("");
      setLoad("");
      dispatch({type:'CREATE_WORKOUTS', payload:json  })
    }
  };

  return (
    <form className="create"  onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>
      <label>Exercize Title: </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields && emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Reps: </label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields && emptyFields.includes('reps') ? 'error' : ''}

      />

      <label>Load (in kg): </label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields && emptyFields.includes('load') ? 'error' : ''}

      />

      <button type="submit">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default WorkoutForm