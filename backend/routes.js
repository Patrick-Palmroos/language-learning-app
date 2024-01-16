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

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "aa" && password === "bb") {
    const authToken = jsonwebtoken.sign(
      { email, userID: 1 },
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
});

router.post("/logout", (req, res) => {
  console.log("routes logout");
  res.clearCookie("authToken");
  res.sendStatus(200);
});

module.exports = router;
