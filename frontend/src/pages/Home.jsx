import { CookiesProvider, useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
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

  return (
    <>
      <div>
        <h1>Learn a Language!</h1>
        <h3>Languages to learn:</h3>
        <ul>
          <li>english</li>
          <li>finnish</li>
          <li>swedish</li>
        </ul>
      </div>
      <div>{logged ? <h1>Welcome!</h1> : <h1>Not logged in</h1>}</div>
    </>
  );
}

export default Home;
