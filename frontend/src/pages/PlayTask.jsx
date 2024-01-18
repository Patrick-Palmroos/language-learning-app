import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";

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

function PlayTask(prop) {
  const [color, setColor] = useState(theme);
  const [answer, setAnswer] = useState("");
  const [err, setErr] = useState(null);
  const [answered, setAnswered] = useState(false);

  //checks if answer is correct.
  if (prop.answered && !answered) {
    const checkAnswer = async () => {
      setAnswered(true);
      if (answer === prop.prop.Finnish) {
        //if answer was correct selects different color theme and increments users score.
        setColor(success);
      } else {
        //if answer was wrong, sents text field to correct answer and sets an error
        setErr("Wrong! Correct answer was:");
        setAnswer(prop.prop.Finnish.toString());
      }
    };

    checkAnswer();
  }

  //if answer changes, uses callback to send relevant info back to parent
  useEffect(() => {
    if (answer === prop.prop.Finnish) {
      prop.callback(prop.prop.TaskID, true);
    } else {
      prop.callback(prop.prop.TaskID, false);
    }
  }, [answer]);

  return (
    <>
      <div className="task">
        <ThemeProvider theme={color}>
          <h2>{prop.prop.English}: </h2>
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
        {answered && color === success ? <p>+1p</p> : null}
      </div>
    </>
  );
}

export default PlayTask;
