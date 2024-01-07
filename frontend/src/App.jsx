import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  axios
    .get(`${import.meta.env.VITE_API_URL}/tasks`)
    .then((resp) => console.log(resp.data))
    .catch((err) => console.log(err));

  return (
    <>
      <h1>{tasks}</h1>
    </>
  );
}

export default App;
