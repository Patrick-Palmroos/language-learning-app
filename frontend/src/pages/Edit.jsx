import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

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

function Edit() {
  const { state } = useLocation();
  const [err, setErr] = useState(null);
  const [task, setTask] = useState(null);
  const [finnish, setFinnish] = useState("");
  const [english, setEnglish] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const findTask = async () => {
      const resp = await axios.post(
        `${import.meta.env.VITE_API_URL}/taskById`,
        { id: state.id },
        { withCredentials: true }
      );
      if (resp) {
        setTask(resp.data[0]);
      } else {
        console.log("error");
      }
    };
    findTask();
  }, []);

  const handleSave = async () => {
    if (finnish.trim() !== "" && english.trim() !== "") {
      try {
        const resp = await axios.patch(
          `${import.meta.env.VITE_API_URL}/editTask`,
          {
            id: state.id,
            finnish: finnish,
            english: english,
          },
          { withCredentials: true }
        );
        if (resp.status === 200) {
          //refreshes the page if save is succesful.
          navigate(0);
        } else {
          console.log("not found");
        }
      } catch (e) {
        console.log("error");
      }
    } else {
      setErr("neither field can be empty");
    }
  };
  return (
    <>
      <h1>Edit task:</h1>

      {task === null ? (
        <p>loading data...</p>
      ) : (
        <h2>
          english: {task.English} - finnish: {task.Finnish}{" "}
        </h2>
      )}
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
      <Button
        variant="contained"
        // endIcon={<LoginOutlinedIcon />}
        onClick={handleSave}
      >
        save
      </Button>
    </>
  );
}

export default Edit;
