import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const autoLogin = async () => {
      try {
        console.log("called");
        const resp = await axios.get(`http://localhost:8080/autoLogin`, {
          withCredentials: true,
        });
        console.log("ok");
        if (resp.status === 200) {
          console.log("success");
          setLogged(true);
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
  const [open, setOpen] = useState(false);

  const handleDropdown = () => {
    setOpen(!open);
  };

  return (
    <>
      <nav id="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/play">Play</Link>
          </li>
        </ul>
        <div className="dropDown">
          <button onClick={handleDropdown}>Profile</button>
          {open ? (
            <ul className="menu-items">
              <li>
                <Link to="/profile">profile</Link>
              </li>
              <li>
                <Link to="/settings">settings</Link>
              </li>
              {logged ? (
                <li>
                  <Link to="/logout">log out</Link>
                </li>
              ) : (
                <li>
                  <Link to="/login">log in</Link>
                </li>
              )}
            </ul>
          ) : null}
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;
