const mysql = require("mysql");
const config = require("./config.js");
const connection = mysql.createPool(config);

//fetches all locations from the sql database

const getAllTasks = async () => {
  const promise = await new Promise((resolve, reject) => {
    connection.query(
      `SELECT CONNECTION_ID() AS ConnID, Tasks.* FROM Tasks`,
      (err, results) => {
        if (err) {
          reject({ code: 404, message: "items not found" });
        }
        resolve(results);
      }
    );
  });

  return promise;
};

module.exports = { getAllTasks };
