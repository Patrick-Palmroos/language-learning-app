import axios from "axios";
import { useState, useEffect } from "react";

function Play() {
  const [tasks, setTasks] = useState([]);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const autoLogin = async () => {
      try {
        console.log("trying");
        const resp = await axios.get(
          `${import.meta.env.VITE_API_URL}/autoLogin`,
          {
            withCredentials: true,
          }
        );
        if (resp.status === 200) {
          console.log("success");
          setLogged(true);
        }
      } catch (err) {
        console.log(err);
        // Handle error
        if (err.response && err.response.status === 401) {
          console.log("Unauthorized access");
        } else {
          console.error("Unexpected error:", err);
        }
      }
    };
    autoLogin();
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/tasks`)
      .then((resp) => setTasks(resp.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {logged ? (
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
      ) : null}
    </>
  );
}

export default Play;
