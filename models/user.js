const mongoose = require("mongoose");

// const Order = require("../models/order");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  // console.log("product : ", product);
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    // console.log("cp product", cp.productId.toString());
    // console.log("product", product._id.toString());
    // console.log("true: ", cp.productId.toString() === product._id.toString());

    return cp.productId.toString() === product._id.toString();
  });

  // console.log("cart prod index : ", cartProductIndex);

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  // console.log("updated cart items : ", updatedCartItems);

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }

  const updatedCart = {
    items: updatedCartItems,
  };

  this.cart = updatedCart;

  return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });

  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart.items = [];
  return this.save();
};

module.exports = mongoose.model("User", userSchema);

// Using mongoDB

// const getDb = require("../util/database").getDb;

// const mongodb = require("mongodb");

// class User {
//   constructor(username, email, cart, id) {
//     this.username = username;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }

//   save() {
//     const db = getDb();

//     return db
//       .collection("users")
//       .insertOne(this)
//       .then((result) => {
//         console.log("Added User");
//       })
//       .catch((err) => console.log(err));
//   }

//   addToCart(product) {
//     console.log("product : ", product);
//     const cartProductIndex = this.cart.items.findIndex((cp) => {
//       // console.log("cp product", cp.productId.toString());
//       // console.log("product", product._id.toString());
//       // console.log("true: ", cp.productId.toString() === product._id.toString());

//       return cp.productId.toString() === product._id.toString();
//     });

//     // console.log("cart prod index : ", cartProductIndex);

//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     // console.log("updated cart items : ", updatedCartItems);

//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         productId: new mongodb.ObjectId(product._id),
//         quantity: newQuantity,
//       });
//     }

//     const updatedCart = {
//       items: updatedCartItems,
//     };
//     const db = getDb();

//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: updatedCart } }
//       );
//   }

//   getCart() {
//     const db = getDb();
//     const productIds = this.cart.items.map((i) => {
//       return i.productId;
//     });

//     return db
//       .collection("products")
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) => {
//         return products.map((p) => {
//           return {
//             ...p,
//             quantity: this.cart.items.find((i) => {
//               return i.productId.toString() === p._id.toString();
//             }).quantity,
//           };
//         });
//       });

//     // Other Way

//     // return this.cart;
//   }

//   deleteItemFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter((item) => {
//       return item.productId.toString() !== productId.toString();
//     });

//     const db = getDb();

//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: { items: updatedCartItems } } }
//       );
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then((products) => {
//         const order = {
//           items: products,
//           user: {
//             _id: new mongodb.ObjectId(this._id),
//             username: this.username,
//             email: this.email,
//           },
//         };
//         return db.collection("orders").insertOne(order);
//       })
//       .then((result) => {
//         this.cart = { items: [] };
//         return db
//           .collection("users")
//           .updateOne(
//             { _id: new mongodb.ObjectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           );
//       })
//       .catch((err) => console.log(err));
//   }

//   getOrders() {
//     const db = getDb();
//     return db
//       .collection("orders")
//       .find({ "user._id": new mongodb.ObjectId(this._id) })
//       .toArray();
//   }

//   static findUserById(userId) {
//     const db = getDb();

//     return db
//       .collection("users")
//       .find({ _id: new mongodb.ObjectId(userId) })
//       .next()
//       .then((user) => {
//         // console.log(user);
//         return user;
//       })
//       .catch((err) => console.log(err));
//   }
// }

// module.exports = User;
// // Using Sequelize

// // const Sequelize = require("sequelize");

// // const sequelize = require("../util/database");

// // const User = sequelize.define("user", {
// //   id: {
// //     type: Sequelize.INTEGER,
// //     autoIncrement: true,
// //     allowNull: false,
// //     primaryKey: true,
// //   },
// //   name: {
// //     type: Sequelize.STRING,
// //     allowNull: false,
// //   },
// //   email: {
// //     type: Sequelize.STRING,
// //     allowNull: false,
// //   },
// // });

// // module.exports = User;
