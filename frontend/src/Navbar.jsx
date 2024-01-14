import { Outlet, Link } from "react-router-dom";
import { useState } from "React";

function Navbar() {
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
            <Link to="play">Play</Link>
          </li>
        </ul>
        <div className="dropDown">
          <button onClick={handleDropdown}>Profile</button>
          {open ? (
            <ul className="menu-items">
              <li>profile</li>
              <li>settings</li>
              <li>login</li>
            </ul>
          ) : null}
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;
