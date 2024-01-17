const mysql = require("mysql");
const config = require("./config.js");
const connection = mysql.createPool(config);

//gets all tasks from database
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

//takes in email & password as parameters and checks if the user exists in database
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

//posts new account detauls into the database
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

//creates a task
const createTask = async (data) => {
  const promise = await new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO Tasks (Language, English, Finnish)
      VALUES ('engfin', ?, ?)`,
      [data.english, data.finnish],
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

//deletes a task by its id
const deleteTaskByID = async (id) => {
  console.log(id);
  const promise = await new Promise((resolve, reject) => {
    connection.query(`DELETE FROM Tasks WHERE TaskID = ?`, [id], (err, res) => {
      if (err) {
        console.log(err);
        reject({ code: 404 });
      }
      resolve({ code: 200 });
    });
  });

  return promise;
};

//edit task. replace english and finnish with the ones in data using UPDATE.
const editTask = async (data) => {
  console.log(data);
  const promise = await new Promise((resolve, reject) => {
    connection.query(
      `UPDATE Tasks SET English = ?, Finnish = ? WHERE TaskID = ?`,
      [data.english, data.finnish, data.id],
      (err, results) => {
        if (err) {
          reject({ code: 404, message: "item not found" });
        }
        resolve({ code: 200 });
      }
    );
  });

  return promise;
};

module.exports = {
  getAllTasks,
  checkForUser,
  createAccount,
  createTask,
  deleteTaskByID,
  editTask,
};
