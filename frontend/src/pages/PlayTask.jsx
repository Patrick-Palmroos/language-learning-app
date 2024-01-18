import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";

//theme for default mui boxes
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

//theme for when answer is right
const success = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "greenyellow",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "greenyellow",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "greenyellow",
          },
        },
      },
    },
  },
});

function PlayTask(task) {
  const [color, setColor] = useState(theme);
  const [answer, setAnswer] = useState("");
  const [err, setErr] = useState(null);
  const [answered, setAnswered] = useState(false);

  //checks if answer is correct.
  const checkAnswer = async () => {
    setAnswered(true);
    if (answer === task.data.Finnish) {
      //if answer was correct selects different color theme and increments users score.
      setColor(success);
      const resp = await axios.get(`${import.meta.env.VITE_API_URL}/newScore`, {
        withCredentials: true,
      });
      if (resp.status !== 200) {
        console.log("Error with sending score to backend");
      }
    } else {
      //if answer was wrong, sents text field to correct answer and sets an error
      setErr("Wrong! Correct answer was:");
      setAnswer(task.data.Finnish.toString());
    }
  };

  return (
    <>
      <div className="task">
        <ThemeProvider theme={color}>
          <h2>{task.data.English}: </h2>
          <TextField
            required
            id="finnish"
            label="answer"
            value={answer}
            InputProps={{ style: { color: "white" } }}
            onChange={(input) => setAnswer(input.target.value)}
            error={err === null ? false : true}
            helperText={err}
          />
        </ThemeProvider>
        {answered && color === success ? (
          <p>+1p</p>
        ) : (
          <Button
            variant="contained"
            size="small"
            onClick={checkAnswer}
            disabled={answered}
          >
            check
          </Button>
        )}
      </div>
    </>
  );
}

export default PlayTask;
