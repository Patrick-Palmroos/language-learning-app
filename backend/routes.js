const db = require("./database/tasksDB");
const express = require("express");
const router = express.Router();

router.get("/tasks", async (req, res) => {
  await db.getAllTasks().then((dbItems) => res.json(dbItems));
});

module.exports = router;
