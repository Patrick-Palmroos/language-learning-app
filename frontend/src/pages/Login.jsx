import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

//theme for handling the textfield colors. Figuring this out caused too much headache..
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

function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);
  const [err, setErr] = useState(null);

  //handles the login button logic
  const handleLogin = async () => {
    //sends a post containing login credentials to check for backend
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          email: emailInput,
          password: passwordInput,
        },
        { withCredentials: true }
      );
      //if response is 200, navigates to home page and refreshes page
      if (resp.status === 200) {
        await navigate("/");
        navigate(0);
      }
    } catch (err) {
      //if account doesnt exist, sets error.
      setErr("invalid password or email");
    }
  };

  //checks if user is logged in to know if page should be displayed.
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
          console.log("success");
          setLogged(true);
        }
      } catch (err) {
        //in case of an error.
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
    <>
      {logged ? null : (
        //theme provider which houses input fields.
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
                error={err === null ? false : true}
                helperText={err}
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                InputProps={{ style: { color: "white" } }}
                onChange={(input) => setPasswordInput(input.target.value)}
                error={err === null ? false : true}
                helperText={err}
              />
            </div>
          </Box>
          <p>
            Don't have an account? Register <Link to="/register">here!</Link>
          </p>
          <Button
            variant="contained"
            endIcon={<LoginOutlinedIcon />}
            onClick={handleLogin}
          >
            Log In
          </Button>
        </ThemeProvider>
      )}
    </>
  );
}

export default Login;
