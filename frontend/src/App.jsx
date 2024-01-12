import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Home from "./pages/Home.jsx";
import Play from "./pages/Play.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="play" element={<Play />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
