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

const createAccount = async (data) => {
  console.log(data);
  const promise = await new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO Users (FirstName, LastName, Password, Email, Admin, points)
      VALUES (?, ?, ?, ?, 0, 0)`,
      [data.fname, data.lname, data.password, data.email],
      (err, res) => {
        if (err) {
          console.log(err);
          reject({ code: 404 });
        }
        resolve({ code: 200 });
      }
    );
  });

  return promise;
};

const createTask = async (data) => {
  console.log("data");
};

const deleteTaskByID = (id) => {
  console.log(id);
};

module.exports = {
  getAllTasks,
  checkForUser,
  createAccount,
  createTask,
  deleteTaskByID,
};
