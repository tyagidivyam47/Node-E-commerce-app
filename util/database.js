
// There is no need for database utility file using Mongoose

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://divyamtyagi:2104@cluster0.cqshg4z.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db("shop");
      callback();
    })
    .catch((err) => {
      console.log("jkhvfsvjh", err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No Database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

// With Sequelize

// const { Sequelize } = require("sequelize");
// const sequelize = new Sequelize("node_complete", "root", "Tyagi1212@goo", {
//   dialect: "mysql",
//   host: "localhost"
// });

// module.exports = sequelize;

// Without Sequlize

// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node_complete",
//   password:"Tyagi1212@goo"
// });

// module.exports = pool.promise();
