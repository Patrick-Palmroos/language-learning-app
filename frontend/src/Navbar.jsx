import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [logged, setLogged] = useState(false);
  const [admin, setAdmin] = useState(false);

  //checks if user is logged and if is, if user is admin.
  useEffect(() => {
    const autoLogin = async () => {
      try {
        console.log("called");
        const resp = await axios.get(
          `${import.meta.env.VITE_API_URL}/autoLogin`,
          {
            withCredentials: true,
          }
        );
        console.log("ok");
        if (resp.status === 200) {
          setLogged(true);
          isAdmin();
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

  //checks if user is an admin.
  const isAdmin = async () => {
    const resp = await axios.get(`${import.meta.env.VITE_API_URL}/userById`, {
      withCredentials: true,
    });
    if (resp.data[0].Admin === 1) {
      setAdmin(true);
      console.log("is admin");
    }
  };

  //handles the state of dropDownmenu
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
            {logged ? (
              <Link to="/play">Learn!</Link>
            ) : (
              <Link to="/login">Learn!</Link>
            )}
          </li>
          <li>{logged && admin ? <Link to="/admin">Admin</Link> : null}</li>
        </ul>
        <div className="dropDown">
          <button onClick={handleDropdown}>Profile</button>
          {open ? (
            <ul className="menu-items">
              <li>
                {logged ? (
                  <Link to="/profile">profile</Link>
                ) : (
                  <Link to="/login">profile</Link>
                )}
              </li>
              <li>
                {logged ? (
                  <Link to="/logout">log out</Link>
                ) : (
                  <Link to="/login">log in</Link>
                )}
              </li>
            </ul>
          ) : null}
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;
