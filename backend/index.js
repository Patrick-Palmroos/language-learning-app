const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const config = require("./database/config.js");
const connection = mysql.createPool(config);

const app = express();
const port = 8080;
app.use(express.json());

app.use(cors());

app.use(express.static("./frontend/dist"));

const server = app
  .listen(port, () => {
    console.log(`SERVER: listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });

//function for disconnecting from server
const gracefulShutdown = () => {
  console.log("Starting graceful shutdown...");
  // Close the server
  if (server) {
    console.log("Server was opened, so we can close it...");
    server.close((err) => {
      if (err) {
        console.error("Server Error: closing server unsuccesful: ", err);
      } else {
        console.log("MySQL: server succesfully closed");
      }
    });

    connection.end((err) => {
      if (err) {
        console.error("MySQL: Error while closing connection: ", err);
      } else {
        console.log("MySQL: connection succesfully closed");
      }

      console.log("MySQL: Shutdown complete");
      process.exit(1);
    });
  }
};

process.on("SIGTERM", gracefulShutdown); // Some other app requirest shutdown.
process.on("SIGINT", gracefulShutdown); // ctrl-c
