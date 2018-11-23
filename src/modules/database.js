'use strict';

const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});


const select = () => {
  // simple query
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM user;',
      (err, results, fields) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const createUser = (data) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      'INSERT INTO user(' +
      'userId, username, password, displayName, countryId, city, bio, email, isAdmin, profileImageId)' +
      'VALUES (0, ?, ?, ?, ?, ?, NULL, ?, 0, NULL);',
      data,
      (err, results, fields) => {
        if (err) reject(err.code);
        if (results) resolve(results);
      });
  });
};

const getUser = (username) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM user WHERE username = ?;', [username], (err, results) => {
        if (err) {
          reject(err.code);
        } else if (results) resolve(results);
      });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM user WHERE userId = ?;', [id], (err, results) => {
        if (err) {
          reject(err.code);
        } else if (results) resolve(results);
      },
    );
  });
};

const getCountries = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM country;',
      (err, results, fields) => {
        if (err) {
          reject(err);
        }
        if (results) {
          resolve(results);
        }
      });
  });
};

module.exports = {
  connection: connection,
  select: select,
  getCountries: getCountries,
  getUser: getUser,
  getUserById: getUserById,
  createUser: createUser,
};
