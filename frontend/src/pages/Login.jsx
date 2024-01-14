import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

//theme for handling the textfield colors. Figuring this out caused too much headache..
const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white", // Label text color
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

function Login() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  //handles storing typing for password field
  const handlePasswordInput = (event) => {
    setPasswordInput(event.target.value);
    console.log(passwordInput);
  };

  //handles storing typing for username field
  const handleUsernameInput = (event) => {
    setUsernameInput(event.target.value);
    console.log(usernameInput);
  };

  const handleLogin = () => {
    console.log(`Username: ${usernameInput} \nPassword: ${passwordInput}`);
  };

  return (
    //theme provider which hauses input fields.
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Username"
            InputProps={{ style: { color: "white" } }}
            onChange={handleUsernameInput}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            InputProps={{ style: { color: "white" } }}
            onChange={handlePasswordInput}
          />
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default Login;
