import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "white", // Helper text color
        },
      },
    },
  },
});

function Register() {
  const [error, setError] = useState({
    fname: null,
    lname: null,
    email: null,
    password: null,
  });
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const validateNewAccount = () => {
    let validInput = true;
    //new error statuses
    const newErrors = {
      fname: null,
      lname: null,
      email: null,
      password: null,
    };

    //check if first name length is less than 1
    if (fname.length < 1) {
      validInput = false;
      newErrors.fname = "First name required*";
    }

    //check if last name length is less than 1
    if (lname.length < 1) {
      validInput = false;
      newErrors.lname = "Last name required*";
    }

    //check if email length is less than 5
    if (email.length < 5) {
      validInput = false;
      newErrors.email = "Email required*";
    } else if (!email.includes("@") || !email.includes(".")) {
      //check if email contains @ and .
      validInput = false;
      newErrors.email = "invalid email address";
    }

    //checks if either passwords length is less than 1
    if (password1.length < 1 || password2 < 1) {
      validInput = false;
      newErrors.password = "password required*";
    } else if (password1 !== password2) {
      //if passwords dont match, fails the check
      validInput = false;
      newErrors.password = "passwords do not match";
    }

    if (validInput) {
      //sends new account to backend
      sendNewUserData();
    } else {
      //sets error statuses for incorrect fields
      setError(newErrors);
    }
  };

  //sends new user data to backend
  const sendNewUserData = async () => {
    try {
      //sends data in axios.post
      const resp = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        {
          fname,
          lname,
          email,
          password: password1,
        },
        { withCredentials: true }
      );
      //if backend responds 200, moves user to home page
      if (resp.status === 200) {
        await navigate("/");
        navigate(0);
      }
    } catch (err) {
      //if account doesnt exist, reloads site so the post works again
      //navigate(0);
      console.log("login failed ", err);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <h2>Create an account:</h2>
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
              id="first-name"
              label="First name"
              InputProps={{ style: { color: "white" } }}
              onChange={(input) => setFname(input.target.value)}
              error={error.fname === null ? false : true}
              helperText={error.fname}
            />
          </div>
          <div>
            <TextField
              required
              id="last-name"
              label="Last name"
              InputProps={{ style: { color: "white" } }}
              onChange={(input) => setLname(input.target.value)}
              error={error.lname === null ? false : true}
              helperText={error.lname}
            />
          </div>
          <div>
            <TextField
              required
              id="email"
              label="Email"
              InputProps={{ style: { color: "white" } }}
              onChange={(input) => setEmail(input.target.value)}
              error={error.email === null ? false : true}
              helperText={error.email}
            />
          </div>
          <div>
            {" "}
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              InputProps={{ style: { color: "white" } }}
              onChange={(input) => setPassword1(input.target.value)}
              error={error.password === null ? false : true}
              helperText={error.password}
            />
          </div>
          <div>
            <TextField
              id="outlined-password-input-again"
              label="Repeat password"
              type="password"
              InputProps={{ style: { color: "white" } }}
              onChange={(input) => setPassword2(input.target.value)}
              error={error.password === null ? false : true}
              helperText={error.password}
            />
          </div>
        </Box>
        <Button
          variant="contained"
          endIcon={<LoginOutlinedIcon />}
          onClick={validateNewAccount}
        >
          Sign Up
        </Button>
      </ThemeProvider>
    </>
  );
}

export default Register;
