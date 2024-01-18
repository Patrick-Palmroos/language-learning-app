import axios from "axios";
import { useState, useEffect } from "react";
import PlayTask from "./PlayTask";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Play() {
  const [tasks, setTasks] = useState([]);
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();

  //checks if user is logged in.
  useEffect(() => {
    const autoLogin = async () => {
      try {
        //sends a post to check if client side has valid cookie and sends a response.
        const resp = await axios.get(
          `${import.meta.env.VITE_API_URL}/autoLogin`,
          {
            withCredentials: true,
          }
        );
        if (resp.status === 200) {
          setLogged(true);
        }
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status === 401) {
          console.log("Unauthorized access");
        } else {
          console.error("Unexpected error:", err);
        }
      }
    };
    autoLogin();
  }, []);

  //gets all tasks
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/tasks`)
      .then((resp) => setTasks(resp.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {logged ? (
        <>
          <div>
            {tasks.length > 0 ? (
              <ul>
                {tasks.map((task) => {
                  return <li key={task.TaskID}>{<PlayTask data={task} />}</li>;
                })}
              </ul>
            ) : (
              <p>Loading data</p>
            )}
          </div>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              navigate(0);
            }}
          >
            try again
          </Button>
        </>
      ) : null}
    </>
  );
}

export default Play;
