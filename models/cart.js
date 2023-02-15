const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;

// Without Sequelize

// const { json } = require("express");
// const fs = require("fs");
// const path = require("path");

// const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

// module.exports = class Cart {
//   static addProduct(id, productPrice) {
//     //Fetch previous cart
//     fs.readFile(p, (err, fileContent) => {
//       let cart = { products: [], totalPrice: 0 };
//       if (!err) {
//         cart = JSON.parse(fileContent);
//       }

//       //Analyze the cart
//       // console.log("sgsf 21",cart);
//       const existingProductIndex = cart.products.findIndex(
//         (prod) => prod.id === id
//       );
//       const existingProduct = cart.products[existingProductIndex];

//       let updatedProduct;

//       //Add new product

//       if (existingProduct) {
//         updatedProduct = { ...existingProduct };
//         updatedProduct.qty += 1;
//         cart.products = [...cart.products];
//         cart.products[existingProductIndex] = updatedProduct;
//       } else {
//         updatedProduct = { id: id, qty: 1 };
//         cart.products = [...cart.products, updatedProduct];
//       }

//       cart.totalPrice += +productPrice;
//       fs.writeFile(p, JSON.stringify(cart), (err) => {
//         console.log(err);
//       });
//     });
//   }

//   static deleteProduct(id, productPrice) {
//     console.log("id", id, "proce ", productPrice);
//     fs.readFile(p, (err, fileContent) => {
//       if (err) {
//         return;
//       }
//       const cart = JSON.parse(fileContent);
//       const updatedCart = { ...cart };

//       const productIndex = cart.products.findIndex((prod) => prod.id === id);
//       const product = updatedCart.products[productIndex];
//       const productQty = product.qty;

//       updatedCart.products.splice(productIndex, 1);
//       updatedCart.totalPrice = cart.totalPrice - productPrice * productQty;

//       fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
//         console.log(err);
//       });
//     });
//   }

//   static getCart(cb) {
//     fs.readFile(p, (err, fileContent) => {
//       if(err){
//         cb(null);
//       }
//       const cart = JSON.parse(fileContent);
//       return cb(cart);
//     });
//   }
// };
