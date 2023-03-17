const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);

// Using MongoDB

// const mongodb = require("mongodb");
// const getDb = require("../util/database").getDb;

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;

//     if (this._id) {
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         // console.log(result);
//       })
//       .catch((err) => console.log(err));
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         // console.log(products);
//         return products;
//       })
//       .catch((err) => console.log(err));
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then((product) => {
//         // console.log("prod ", product);
//         return product;
//       })
//       .catch((err) => console.log(err));
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then((result) => {
//         console.log("deleted");
//       })
//       .catch((err) => console.log(err));
//   }
// }

// module.exports = Product;

// // With Sequelize

// // const { Sequelize } = require("sequelize");
// // const sequelize = require("../util/database");

// // const Product = sequelize.define("product", {
// //   id: {
// //     type: Sequelize.INTEGER,
// //     autoIncrement: true,
// //     allowNull: false,
// //     primaryKey: true,
// //   },
// //   title: Sequelize.STRING,
// //   price: {
// //     type: Sequelize.DOUBLE,
// //     allowNull: false,
// //   },
// //   description: {
// //     type: Sequelize.STRING,
// //     allowNull: false,
// //   },
// //   imgUrl: {
// //     type: Sequelize.STRING,
// //     allowNull: false,
// //   },
// // });

// // module.exports = Product;

// // // Without using sequelize

// // // // const fs = require("fs");
// // // // const path = require("path");

// // // const db = require("../util/database");

// // // const Cart = require("./cart");
// // // // const products = [];

// // // // const p = path.join(
// // // //   path.dirname(require.main.filename),
// // // //   "data",
// // // //   "products.json"
// // // // );

// // // // const getProductsFromFile = (cb) => {
// // // //   fs.readFile(p, (err, fileContent) => {
// // // //     if (err) {
// // // //       cb([]);
// // // //     } else {
// // // //       cb(JSON.parse(fileContent));
// // // //     }
// // // //   });
// // // // };

// // // module.exports = class Product {
// // //   constructor(id, title, imageUrl, description, price) {
// // //     this.id = id;
// // //     this.title = title;
// // //     this.imgUrl = imageUrl;
// // //     this.description = description;
// // //     this.price = price;
// // //   }

// // //   save() {
// // //     return db.execute(
// // //       "INSERT INTO products (title, price, description, imgUrl) VALUES (?,?,?,?)",
// // //       [this.title, this.price, this.description, this.imgUrl]
// // //     );

// // //     // Using file system

// // //     // getProductsFromFile((products) => {
// // //     //   if (this.id) {
// // //     //     const existingProductIndex = products.findIndex(
// // //     //       (prod) => prod.id === this.id
// // //     //     );
// // //     //     const updatedProducts = [...products];
// // //     //     updatedProducts[existingProductIndex] = this;
// // //     //     fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
// // //     //       console.log(err);
// // //     //     });
// // //     //   }
// // //     //   else {
// // //     //     this.id = Math.random().toString();
// // //     //     products.push(this);
// // //     //     fs.writeFile(p, JSON.stringify(products), (err) => {
// // //     //       console.log(err);
// // //     //     });
// // //     //   }
// // //     // });

// // //     // Older

// // //     // console.log("inside save");
// // //     // products.push(this);
// // //     // const p = path.join(
// // //     //   path.dirname(require.main.filename),
// // //     //   "data",
// // //     //   "products.json"
// // //     // );

// // //     // fs.readFile(p, (err, fileContent) => {
// // //     //   let products = [];
// // //     //   if (!err) {
// // //     //     products = JSON.parse(fileContent);
// // //     //     // console.log(products);
// // //     //   }
// // //     //   products.push(this);
// // //     //   fs.writeFile(p, JSON.stringify(products), (err) => {
// // //     //     // console.log(err);
// // //     //   });
// // //     // });
// // //     // console.log(p);
// // //   }

// // //   static fetchAll() {
// // //     return db.execute("SELECT * FROM products");

// // //     // getProductsFromFile(cb);
// // //   }

// // //   static findById(id) {
// // //     return db.execute("SELECT * FROM products WHERE (products.id = ?)", [id]);

// // //     // Using File System

// // //     // getProductsFromFile((products) => {
// // //     //   const product = products.find((p) => p.id == id);

// // //     //   cb(product);
// // //     // });
// // //   }

// // //   static deleteProductById(id) {
// // //     getProductsFromFile((products) => {
// // //       const existingProductIndex = products.findIndex((prod) => prod.id === id);
// // //       const existingProduct = products[existingProductIndex];
// // //       let updatedProducts = [...products];
// // //       updatedProducts.splice(existingProductIndex, 1);
// // //       fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
// // //         if (!err) {
// // //           Cart.deleteProduct(id, existingProduct.price);
// // //         }
// // //       });
// // //     });
// // //   }
// // // };
