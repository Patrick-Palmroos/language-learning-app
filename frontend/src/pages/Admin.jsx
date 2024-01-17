import { useEffect, useState } from "react";
import axios from "axios";
import Task from "./Task";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

//theme for mui boxes.
const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        },
      },
    },
  },
});

function Admin() {
  const [logged, setLogged] = useState(false);
  const [adminLogged, setAdminLogged] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [finnish, setFinnish] = useState("");
  const [english, setEnglish] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  //gets all tasks and puts them inside tasks
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/tasks`)
      .then((resp) => setTasks(resp.data))
      .catch((err) => console.log(err));
  }, []);

  //handles pressing the new task button
  const handleNewTask = async () => {
    if (finnish.trim() !== "" && english.trim() !== "") {
      if (err !== null) {
        setErr(null);
      }
      //sends a post containing login credentials to check for backend
      try {
        const resp = await axios.post(
          `${import.meta.env.VITE_API_URL}/addTask`,
          {
            english: english,
            finnish: finnish,
          },
          { withCredentials: true }
        );
        //if response is 200, refreshes page
        if (resp.status === 200) {
          navigate(0);
        }
      } catch (err) {
        //error sets err to be "invalid input"
        setErr("invalid input");
      }
    } else {
      //if fields are empty sets error message
      setErr("both fields need to be filled");
    }
  };

  return (
    <>
      <h2>New task:</h2>
      <div>
        <ThemeProvider theme={theme}>
          <TextField
            required
            id="english"
            label="english"
            InputProps={{ style: { color: "white" } }}
            onChange={(input) => setEnglish(input.target.value)}
            error={err === null ? false : true}
            helperText={err}
          />
          <TextField
            required
            id="finnish"
            label="finnish"
            InputProps={{ style: { color: "white" } }}
            onChange={(input) => setFinnish(input.target.value)}
            error={err === null ? false : true}
            helperText={err}
          />
        </ThemeProvider>
      </div>
      <Button variant="contained" onClick={handleNewTask}>
        add task
      </Button>
      <h2>all tasks:</h2>
      <ul>
        {tasks.map((task) => {
          return (
            <Task
              key={task.TaskID}
              task={{
                id: task.TaskID,
                english: task.English,
                finnish: task.Finnish,
              }}
            />
          );
        })}
      </ul>
    </>
  );
}

export default Admin;
