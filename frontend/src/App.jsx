import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Home from "./pages/Home.jsx";
import Play from "./pages/Play.jsx";

function App() {
  const [tasks, setTasks] = useState([]);

  axios
    .get(`${import.meta.env.VITE_API_URL}/tasks`)
    .then((resp) => setTasks(resp.data[0].TaskID))
    .catch((err) => console.log(err));

  return (
    <>
      <h1>{tasks}</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="play" element={<Play />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
