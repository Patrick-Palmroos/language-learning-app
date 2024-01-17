const db = require("./database/tasksDB");
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

//route for getting all tasks
router.get("/tasks", async (req, res) => {
  await db.getAllTasks().then((dbItems) => res.json(dbItems));
});

//route for logging the user automatically in.
router.get("/autoLogin", (req, res) => {
  const authToken = req.cookies.authToken;
  console.log("autologin initialized");
  //checks if authtoken exists and then attempts to decode it.
  if (authToken) {
    try {
      const decodToken = jsonwebtoken.verify(authToken, process.env.AUTH_KEY);
      console.log(decodToken.userID);
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

//logs the user in. Takes email & password inside req.body.
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //calls db.checkforuser and if response is code 200, logs user in and saves encrypted token.
  try {
    const resp = await db.checkForUser(email, password);

    if (resp.code === 200) {
      console.log("routes has id of: " + resp.id);
      const authToken = jsonwebtoken.sign(
        { userID: resp.id },
        process.env.AUTH_KEY
      );
      res.cookie("authToken", authToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      res.sendStatus(200);
      console.log("logged in");
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    console.log("unexpected error");
    res.sendStatus(401);
  }
});

//logs the user out by clearing the cookie
router.post("/logout", (req, res) => {
  console.log("routes logout");
  res.clearCookie("authToken");
  res.sendStatus(200);
});

//route for creating an account. req.body has new to be added credentials.
router.post("/signup", async (req, res) => {
  await db
    .createAccount(req.body)
    .then((result) => res.sendStatus(result.code));
});

//route for adding a task
router.post("/addTask", async (req, res) => {
  console.log("added:");
  db.createTask(req);
});

//route for deleting a task
router.post("/deleteTask", async (req, res) => {
  console.log("deleting " + req.body.id + "...");
  db.deleteTaskByID(req.body.id);
});

module.exports = router;
