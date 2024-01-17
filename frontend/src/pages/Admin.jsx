import { useEffect, useState } from "react";
import axios from "axios";
import Task from "./Task";

function Admin() {
  const [logged, setLogged] = useState(false);
  const [adminLogged, setAdminLogged] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/tasks`)
      .then((resp) => setTasks(resp.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h2>add task:</h2>
      <p>bla bla blaaaaaa</p>
      <h2>all tasks:</h2>
      <ul>
        {tasks.map((task) => {
          console.log(task);
          return (
            <Task
              key={task.id}
              task={{ id: 1, english: task.English, finnish: task.Finnish }}
            />
          );
        })}
      </ul>
    </>
  );
}

export default Admin;
