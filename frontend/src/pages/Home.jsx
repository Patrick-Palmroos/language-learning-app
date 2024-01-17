import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [logged, setLogged] = useState(false);

  //checks if user is logged in from client side
  useEffect(() => {
    const autoLogin = async () => {
      try {
        const resp = await axios.get(
          `${import.meta.env.VITE_API_URL}/autoLogin`,
          {
            withCredentials: true,
          }
        );
        //if backend responds with "ok", sets user being logged to true.
        if (resp.status === 200) {
          console.log("success");
          setLogged(true);
        }
      } catch (err) {
        console.log(err);
        // Handle error if axios.get fails
        if (err.response && err.response.status === 401) {
          console.log("Unauthorized access");
        } else {
          console.error("Unexpected error:", err);
        }
      }
    };
    autoLogin();
  }, []);

  return (
    <>
      <div>
        <h1>Learn a Language!</h1>
        <h3>Languages to learn:</h3>
        <ul>
          <li>english</li>
          <li>finnish</li>
        </ul>
      </div>
      <div>{logged ? <h1>Welcome!</h1> : <h1>Not logged in</h1>}</div>
    </>
  );
}

export default Home;
