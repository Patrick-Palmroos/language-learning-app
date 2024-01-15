const db = require("./database/tasksDB");
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");

const router = express.Router();

const SECRET_KEY = "test";

router.get("/tasks", async (req, res) => {
  await db.getAllTasks().then((dbItems) => res.json(dbItems));
});

router.get("/autoLogin", (req, res) => {
  const authToken = req.cookies.authToken;
  console.log(req.cookies.authToken);
  if (authToken) {
    try {
      const decodToken = jsonwebtoken.verify(authToken, SECRET_KEY);

      res.sendStatus(200);
    } catch (err) {
      //res.sendStatus(404);
      console.log("invalid token");
    }
  } else {
    //res.sendStatus(404);
    console.log("no token provided");
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "aa" && password === "bb") {
    const authToken = jsonwebtoken.sign({ email }, SECRET_KEY);
    res.cookie("authToken", authToken, {
      httpOnly: true,
      maxAge: 6000,
    });
    res.sendStatus(200);
    console.log("logged in");
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
