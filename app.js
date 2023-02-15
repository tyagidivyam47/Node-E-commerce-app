const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
// const db = require("./util/database");

const app = express();

// app.set("view engine", "pug");
app.set("view engine", "ejs");
app.set("views", "views");

const errorController = require("./controllers/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  .sync()
  .then((result) => {
    // console.log("Results are : ", result);
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "test1@mail.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// db.execute("SELECT * FROM products").then(result =>{
//   console.log((result[0]))
// }).catch(error =>{
//   console.log(error);
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", errorController.getErrorPage);
});

// app.listen(3000);
