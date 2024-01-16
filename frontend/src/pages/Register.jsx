import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

function Register() {
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
              onChange={(input) => console.log("lol")}
            />
          </div>
          <div>
            <TextField
              required
              id="last-name"
              label="Last name"
              InputProps={{ style: { color: "white" } }}
              onChange={(input) => console.log("lol")}
            />
          </div>
          <div>
            <TextField
              required
              id="email"
              label="Email"
              InputProps={{ style: { color: "white" } }}
              onChange={(input) => console.log("lol")}
            />
          </div>
          <div>
            {" "}
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              InputProps={{ style: { color: "white" } }}
              onChange={(input) => console.log("lol")}
            />
          </div>
          <div>
            <TextField
              id="outlined-password-input-again"
              label="Password"
              type="password"
              InputProps={{ style: { color: "white" } }}
              onChange={(input) => console.log("lol")}
            />
          </div>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Register;
