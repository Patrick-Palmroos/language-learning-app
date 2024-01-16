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

const checkForUser = async (email, password) => {
  console.log("we go in");
  const promise = await new Promise((resolve, reject) => {
    connection.query(
      `SELECT CONNECTION_ID() AS ConnID, Users.* FROM Users WHERE Email = ? AND Password = ?`,
      [email, password],
      (err, res) => {
        if (err) {
          console.log(err);
          reject({ code: 404 });
        } else {
          if (res[0] != undefined) {
            resolve({ code: 200, id: res[0].UserID });
          } else {
            reject({ code: 404 });
          }
        }
      }
    );
  });

  return promise;
};

module.exports = { getAllTasks, checkForUser };
