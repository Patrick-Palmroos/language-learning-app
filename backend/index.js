const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const config = require("./database/config.js");
const cookieParser = require("cookie-parser");

const connection = mysql.createPool(config);
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

//allowed origins
const allowedOrigins = [
  "http://localhost:5174",
  "https://language-app-pg4n.onrender.com",
  "https://language-learning-ed4d.onrender.com/",
];

//cors settings
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    allowedHeaders: [
      "set-cookie",
      "Content-Type",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
    ],
  })
);
app.use(cookieParser());

app.use(express.static("./frontend/dist"));

app.use("/", routes);

//for establishing connection
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
