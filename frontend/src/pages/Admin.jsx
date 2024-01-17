import { useEffect, useState } from "react";
import axios from "axios";
import Task from "./Task";

function Admin() {
  const [logged, setLogged] = useState(false);
  const [adminLogged, setAdminLogged] = useState(false);

  return (
    <>
      <h2>add task:</h2>
      <p>bla bla blaaaaaa</p>
      <h2>all tasks:</h2>
      <ul>
        <Task task={{ id: 1, english: "poo", finnish: "kakka" }} />
        <Task task={{ id: 2, english: "test", finnish: "testi" }} />
      </ul>
    </>
  );
}

export default Admin;
