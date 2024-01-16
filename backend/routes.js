const db = require("./database/tasksDB");
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

router.get("/tasks", async (req, res) => {
  await db.getAllTasks().then((dbItems) => res.json(dbItems));
});

router.get("/autoLogin", (req, res) => {
  const authToken = req.cookies.authToken;
  console.log("autologin initialized");
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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

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

router.post("/logout", (req, res) => {
  console.log("routes logout");
  res.clearCookie("authToken");
  res.sendStatus(200);
});

module.exports = router;
