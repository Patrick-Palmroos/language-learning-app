import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Logout() {
  const navigate = useNavigate();

  //sends logout command to backend.
  useEffect(() => {
    const logUserOut = async () => {
      console.log("lol");
      const resp = await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        null,
        {
          withCredentials: true,
        }
      );
      if (resp.status === 200) {
        //after logging out, sends user to home page and reloads site.
        await navigate("/");
        navigate(0);
      } else {
        console.log("logout failed.");
      }
    };

    logUserOut();
  }, [navigate]);

  return <h3>Logging you out...</h3>;
}

export default Logout;
