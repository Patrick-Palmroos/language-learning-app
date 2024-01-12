import axios from "axios";
import { useState, useEffect } from "react";

function Play() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/tasks`)
      .then((resp) => setTasks(resp.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => {
            console.log(task);
            return (
              <li
                key={task.TaskID}
              >{`task in english: ${task.English}, finnish: ${task.Finnish}, swedish: ${task.Swedish}`}</li>
            );
          })}
        </ul>
      ) : (
        <p>Loading data</p>
      )}
    </div>
  );
}

export default Play;
