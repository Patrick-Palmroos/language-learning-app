import axios from "axios";
import { useState, useEffect } from "react";
import PlayTask from "./PlayTask";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Play() {
  const [tasks, setTasks] = useState([]);
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [corrCount, setCorrCount] = useState(null);

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

  //updates user score inside the setData
  function updateScore(id, ans) {
    let changed = false;
    //creates new array to be saved inside data.
    const newData = data.map((item) => {
      if (item.id === id) {
        console.log("before map: " + item.id + item.input);
        changed = true;
        return { ...item, input: ans };
      }
      return { ...item };
    });
    if (changed) {
      setData(newData);
    }
  }

  //handles clicking the check button
  const handleCheck = async () => {
    //sets answered to true so each task object knows were finished.
    await setAnswered(true);
    //gets how many answers were correct
    let corrCount = 0;
    data.map((item) => {
      if (item.input) {
        corrCount++;
      }
    });
    setCorrCount(corrCount);
    //sends the new score to backend
    const resp = await axios.post(
      `${import.meta.env.VITE_API_URL}/newScore`,
      {
        score: corrCount,
      },
      {
        withCredentials: true,
      }
    );
    if (resp.status !== 200) {
      console.log("Error with sending score to backend");
    }
  };

  //gets all tasks
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/tasks`)
      .then((resp) => setTasks(resp.data))
      .catch((err) => console.log(err));
  }, []);

  //maps tasks and puts them inside data with setData
  useEffect(() => {
    const newData = tasks.map((task) => {
      return { id: task.TaskID, input: false };
    });

    setData(newData);
  }, [tasks]);

  return (
    <>
      {logged ? (
        <>
          <div>
            {answered && corrCount !== null ? (
              <h1>
                Your score was: {corrCount}/{tasks.length}
              </h1>
            ) : null}
            {tasks.length > 0 ? (
              <ul>
                {tasks.map((task) => {
                  // console.log(tasks.length);
                  return (
                    <li key={task.TaskID}>
                      {
                        <PlayTask
                          prop={task}
                          callback={updateScore}
                          answered={answered}
                        />
                      }
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>Loading data</p>
            )}
          </div>
          {answered ? (
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                navigate(0);
              }}
            >
              Try again!
            </Button>
          ) : (
            <Button variant="contained" size="small" onClick={handleCheck}>
              Check
            </Button>
          )}
        </>
      ) : (
        <p>Must be logged in..</p>
      )}
    </>
  );
}

export default Play;
