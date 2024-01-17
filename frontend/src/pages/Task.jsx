import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Task(data) {
  const navigate = useNavigate();
  const task = {
    id: data.task.id,
    english: data.task.english,
    finnish: data.task.finnish,
  };

  //handles the deletion of a task
  const handleDeletion = async () => {
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_API_URL}/deleteTask`,
        {
          id: task.id,
        },
        { withCredentials: true }
      );
      if (resp.status === 200) {
        //refreshes page if deletion us succesful
        navigate(0);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <li id={task.id}>
        <h2>
          en: {task.english}, fi: {task.finnish}
        </h2>
      </li>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/edit", {
            state: {
              id: task.id,
            },
          });
        }}
      >
        Edit
      </Button>
      <Button variant="contained" onClick={handleDeletion}>
        Delete
      </Button>
    </>
  );
}

export default Task;
