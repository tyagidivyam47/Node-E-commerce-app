const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("node_complete", "root", "Tyagi1212@goo", {
  dialect: "mysql",
  host: "localhost"
});

module.exports = sequelize;

// Without Sequlize

// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node_complete",
//   password:"Tyagi1212@goo"
// });

// module.exports = pool.promise();
