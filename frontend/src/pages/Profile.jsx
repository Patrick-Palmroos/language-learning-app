import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [logged, setLogged] = useState(false);
  const [info, setInfo] = useState({
    fname: "",
    Lname: "",
    score: 0,
  });

  //checks if user is logged to know if page should be displayed.
  useEffect(() => {
    const autoLogin = async () => {
      try {
        //sends a post to check if client side has valid cookie and sends a response.
        const resp = await axios.get(
          `${import.meta.env.VITE_API_URL}/autoLogin`,
          {
            withCredentials: true,
          }
        );
        if (resp.status === 200) {
          setLogged(true);
        }
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status === 401) {
          console.log("Unauthorized access");
        } else {
          console.error("Unexpected error:", err);
        }
      }
    };
    autoLogin();
  }, []);

  //gets user info when logged gets updated.
  useEffect(() => {
    const userInfo = async () => {
      if (logged) {
        const resp = await axios.get(
          `${import.meta.env.VITE_API_URL}/userById`,
          {
            withCredentials: true,
          }
        );
        if (resp) {
          setInfo({
            fname: resp.data[0].FirstName,
            Lname: resp.data[0].LastName,
            score: resp.data[0].points,
          });
        }
      }
    };
    userInfo();
  }, [logged]);

  return (
    <>
      {logged ? (
        <>
          <div>
            <h1>Profile</h1>
            <h2>
              Welcome {info.fname} {info.Lname}!
            </h2>
          </div>
          <div>
            <h2>your total score is: {info.score}</h2>
          </div>
        </>
      ) : (
        <p>Must be logged in</p>
      )}
    </>
  );
}

export default Profile;
