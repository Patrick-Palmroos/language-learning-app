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
        <h3>Learn english/finnish today!</h3>
        <h3>how to use:</h3>
        <ul>
          <li>must be logged in to use application</li>
          <li>if you don't have an an account, create one from login page.</li>
          <li>alternatively use test account:</li>
          <li>email: rand.user@gmail.com, password: test123</li>
          <li>
            Click on learn to start learning today! You can see your score from
            your profile!
          </li>
        </ul>
      </div>
      <div>{logged ? <h1>Welcome!</h1> : null}</div>
    </>
  );
}

export default Home;
