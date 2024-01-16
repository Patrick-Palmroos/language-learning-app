import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import Button from "@mui/material/Button";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log(`Username: ${emailInput} \nPassword: ${passwordInput}`);
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          email: emailInput,
          password: passwordInput,
        },
        { withCredentials: true }
      );
      if (resp.status === 200) {
        console.log("LogggeeedINNNNNN");
        await navigate("/");
        navigate(0);
      }
    } catch (err) {
      //if account doesnt exist, reloads site so the post works again
      navigate(0);
      console.log("login failed ", err);
    }
  };

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

  return (
    //theme provider which hauses input fields.
    <ThemeProvider theme={theme}>
      <h1>Log in</h1>
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
            label="Email"
            InputProps={{ style: { color: "white" } }}
            onChange={(input) => setEmailInput(input.target.value)}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            InputProps={{ style: { color: "white" } }}
            onChange={(input) => setPasswordInput(input.target.value)}
          />
        </div>
      </Box>
      <Button
        variant="contained"
        endIcon={<LoginOutlinedIcon />}
        onClick={handleLogin}
      >
        Log In
      </Button>
    </ThemeProvider>
  );
}

export default Login;
