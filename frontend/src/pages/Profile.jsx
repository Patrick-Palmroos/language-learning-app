import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [logged, setLogged] = useState(false);

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

  return <>{logged ? <h1>Profile</h1> : null}</>;
}

export default Profile;
