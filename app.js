const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require('connect-flash');

const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const User = require("./models/user");

mongoose.set("strictQuery", true); // To Suppress the strictQuery warning

// const mongoConnect = require("./util/database").mongoConnect;
// const sequelize = require("./util/database");
// const Product = require("./models/product");
// const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");
// const Order = require("./models/order");
// const OrderItem = require("./models/order-item");
// const db = require("./util/database");

const MONGODB_URI =
  "mongodb+srv://divyamtyagi:2104@cluster0.cqshg4z.mongodb.net/shop?retryWrites=true&w=majority";

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

// app.set("view engine", "pug");
app.set("view engine", "ejs");
app.set("views", "views");

// app.use((req, res, next) => {

//   // Using Sequelize

//   // User.findByPk(1)
//   //   .then((user) => {
//   //     req.user = user;
//   //     next();
//   //   })
//   //   .catch((err) => console.log(err));
//   // next();
// });

// Registered Middlewares

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", errorController.getErrorPage);
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// mongoConnect(() => {
//   app.listen(3000);
// });

// app.listen(3000);

// Using Sequelize

// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

// sequelize
//   // .sync({force:true})
//   .sync()
//   .then((result) => {
//     // console.log("Results are : ", result);
//     return User.findByPk(1);
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({ name: "Max", email: "test1@mail.com" });
//     }
//     return user;
//   })
//   .then((user) => {
//     // console.log(user);
//     return user.createCart();
//   })
//   .then((cart) => {
//     app.listen(3000);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// db.execute("SELECT * FROM products").then(result =>{
//   console.log((result[0]))
// }).catch(error =>{
//   console.log(error);
// });
