import { useLocation } from "react-router-dom";

function Edit() {
  const { state } = useLocation();
  console.log(state);
  return <h1>ll</h1>;
}

export default Edit;
