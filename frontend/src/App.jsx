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
