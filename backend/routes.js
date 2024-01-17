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
  //checks if authtoken exists and then attempts to decode it.
  if (authToken) {
    try {
      const decodToken = jsonwebtoken.verify(authToken, process.env.AUTH_KEY);
      res.sendStatus(200);
    } catch (err) {
      console.log("invalid token");
    }
  } else {
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
  await db.createTask(req.body).then((stat) => res.sendStatus(stat.code));
});

//route for deleting a task
router.post("/deleteTask", async (req, res) => {
  console.log("deleting " + req.body.id + "...");
  await db
    .deleteTaskByID(req.body.id)
    .then((stat) => res.sendStatus(stat.code));
});

//route for editin task
router.patch("/editTask", async (req, res) => {
  await db.editTask(req.body).then((stat) => res.sendStatus(stat.code));
});

//route for getting task by id.
router.post("/taskById", async (req, res) => {
  await db.findTaskById(req.body.id).then((item) => res.json(item));
});

//route for getting user by id
router.get("/userById", async (req, res) => {
  const authToken = req.cookies.authToken;
  if (authToken) {
    try {
      //decodes token and sends it to database
      const decodToken = jsonwebtoken.verify(authToken, process.env.AUTH_KEY);
      await db.findUserByID(decodToken.userID).then((item) => res.json(item));
    } catch (err) {
      console.log("invalid token");
    }
  } else {
    console.log("no token provided");
  }
});

module.exports = router;
