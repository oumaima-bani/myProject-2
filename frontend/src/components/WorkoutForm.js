import { useState} from 'react'

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, reps, load };
    const response = await fetch("/api/workouts", {
      method: "Post",
      body: JSON.stringify(workout),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle("");
      setReps("");
      setLoad("");
      setError(null);
      console.log("new workout added", json);
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
      />

      <label>Reps: </label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <label>Load (in kg): </label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <button type="submit">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default WorkoutForm