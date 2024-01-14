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
            borderColor: "white", // Outline color
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white", // Outline color
          },
        },
      },
    },
  },
});

function Login() {
  return (
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
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            InputProps={{ style: { color: "white" } }}
          />
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default Login;
