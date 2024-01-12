import { Outlet, Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav id="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="play">Play</Link>
          </li>
        </ul>
        <ul>
          <li>settings</li>
          <li>Login</li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;
