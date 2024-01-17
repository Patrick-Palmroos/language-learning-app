import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";

function Task(data) {
  const task = {
    id: data.task.id,
    english: data.task.english,
    finnish: data.task.finnish,
  };

  //handles the deletion of a task
  const handleDeletion = async () => {
    try {
      const resp = axios.post(
        `${import.meta.env.VITE_API_URL}/deleteTask`,
        {
          id: task.id,
        },
        { withCredentials: true }
      );
      console.log(resp);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <li>
        <h2>
          task:{task.id} en:{task.english} fi:{task.finnish}
        </h2>
      </li>
      <Button
        variant="contained"
        // endIcon={<LoginOutlinedIcon />}
        onClick={() => console.log("edit")}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        // endIcon={<LoginOutlinedIcon />}
        onClick={handleDeletion}
      >
        Delete
      </Button>
    </>
  );
}

export default Task;
