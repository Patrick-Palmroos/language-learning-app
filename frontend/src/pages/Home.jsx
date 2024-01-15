import { CookiesProvider, useCookies } from "react-cookie";

function Home() {
  const [cookies] = useCookies(["user"]);

  return (
    <CookiesProvider>
      <div>
        <h1>Learn a Language!</h1>
        <h3>Languages to learn:</h3>
        <ul>
          <li>english</li>
          <li>finnish</li>
          <li>swedish</li>
        </ul>
      </div>
      <div>
        {cookies.user ? (
          <h1>Welcome: {cookies.user.username}</h1>
        ) : (
          <h1>Not logged in</h1>
        )}
      </div>
    </CookiesProvider>
  );
}

export default Home;
