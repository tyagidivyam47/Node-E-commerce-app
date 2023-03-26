// const products = [];
const Product = require("../models/product");
const Order = require("../models/order");
// const Cart = require("../models/cart");
// const { where } = require("sequelize");

exports.getProducts = (req, res, next) => {
  Product.find()
    // .populate("userId")   This will populate user information in the fetched data
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));

  // With mongoDB

  // Product.fetchAll()
  //   .then((products) => {
  //     res.render("shop/product-list", {
  //       prods: products,
  //       pageTitle: "All Products",
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => console.log(err));

  // Without Sequelize

  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render("shop/product-list", {
  //       prods: rows,
  //       pageTitle: "All Products",
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  //  Older

  // console.log("Another middleware", adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  // const products = adminData.products;

  // USING FILE SYSTEM

  // Product.fetchAll((products) => {
  //   res.render("shop/product-list", {
  //     prods: products,
  //     pageTitle: "All products",
  //     path: "/products",
  //   });
  // });
};

exports.getProductDetail = (req, res, next) => {
  const prodId = req.params.productId;

  // using mongoose and mongoDB

  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));

  //  With Sequelize

  // Product.findById({ where: { id: prodId } })
  //   .then((products) => {
  //     res.render("shop/product-detail", {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => console.log(err));

  // Product.findByPk(prodId)
  //   .then((product) => {
  //     // console.log("36", product);
  //     res.render("shop/product-detail", {
  //       product: product,
  //       pageTitle: product.title,
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => console.log(err));

  // Without using sequelize

  // Product.findById(prodId)
  //   .then(([product, fieldData]) => {
  //     console.log("36", product);
  //     res.render("shop/product-detail", {
  //       product: product[0],
  //       pageTitle: product[0].title,
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => console.log(err));

  // Using File System

  // Product.findById(prodId, (product) => {
  //   res.render("shop/product-detail", {
  //     product: product,
  //     pageTitle: product.title,
  //     path: "/products",
  //   });
  //   // console.log("controller ",product);
  // });
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));

  // Without Sequelize

  // Product.fetchAll().then(([rows, fieldData]) => {
  //   res.render("shop/index", {
  //     prods: rows,
  //     pageTitle: "Shop",
  //     path: "/",
  //   });
  // });

  // Using File System

  // Product.fetchAll((products) => {
  //   res.render("shop/index", {
  //     prods: products,
  //     pageTitle: "Shop",
  //     path: "/",
  //   });
  // });
};

exports.getCart = (req, res, next) => {
  // console.log("shop 130 ", req.user);

  req.user
    // .select("cart")
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));

  // req.user
  //   .getCart()
  //   .then((products) => {
  //     res.render("shop/cart", {
  //       path: "/cart",
  //       pageTitle: "Your Cart",
  //       products: products,
  //     });
  //   })
  //   .catch((err) => console.log(err));

  // With Sequelize

  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     // console.log("shop 134 ", cart);
  //     return cart
  //       .getProducts()
  //       .then((products) => {
  //         res.render("shop/cart", {
  //           path: "/cart",
  //           pageTitle: "Your Cart",
  //           products: products,
  //         });
  //       })
  //       .catch((err) => console.log(err));
  //   })
  //   .catch((err) => console.log(err));

  // without sequelize

  // Cart.getCart((cart) => {
  //   Product.fetchAll((products) => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(
  //         (prod) => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         console.log("46 shop con");
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }

  //     res.render("shop/cart", {
  //       path: "/cart",
  //       pageTitle: "Your Cart",
  //       products: cartProducts,
  //     });
  //   });
  // });
};

exports.postCart = (req, res, next) => {
  // With mongooes and mongoDB

  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));

  // With Sequelize

  // let fetchedCart;
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     fetchedCart = cart;
  //     return cart.getProducts({ where: { id: prodId } });
  //   })
  //   .then((products) => {
  //     let product;
  //     if (products.length > 0) {
  //       product = products[0];
  //     }
  //     let newQuantity = 1;
  //     if (product) {
  //       console.log("rfrproduct", product);
  //       console.log("rfr", product.cartItem);
  //       const oldQuantity = product.cartItem.quantity;
  //       newQuantity = oldQuantity + 1;

  //       fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
  //     }
  //     return Product.findByPk(prodId)
  //       .then((product) =>
  //         fetchedCart.addProduct(product, {
  //           through: { quantity: newQuantity },
  //         })
  //       )
  //       .catch((err) => console.log(err));
  //   })
  //   .then(() => {
  //     res.redirect("/cart");
  //   })
  //   .catch((err) => console.log(err));

  // Without sequelize

  // const prodId = req.body.productId;
  // Product.findById(prodId, (product) => {
  //   Cart.addProduct(prodId, product.price);
  // });
  // console.log(prodId);
  // res.redirect("/cart");
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));

  // With Sequelize

  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     return cart.getProducts({ where: { id: prodId } });
  //   })
  //   .then((products) => {
  //     const product = products[0];
  //     return product.cartItem.destroy();
  //   })
  //   .then((result) => {
  //     res.redirect("/cart");
  //   })
  //   .catch((err) => console.log(err));

  // Without Sequelize

  // const prodId = req.body.productId;
  // Product.findById(prodId, (prod) => {
  //   const productPrice = prod.price;
  //   Cart.deleteProduct(prodId, productPrice);
  // });
  // res.redirect("/cart");
};

exports.postOrder = (req, res, next) => {
  req.user
    // .select("cart")
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { product: { ...i.productId._doc }, quantity: i.quantity }; // _doc is used to avoid retrieving meta data that is present and hidden
      });

      const order = new Order({
        products: products,
        user: {
          email: req.user.email,
          userId: req.user._id,
        },
      });
      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));

  // req.user
  //   .addOrder()
  //   .then((result) => {
  //     res.redirect("/orders");
  //   })
  //   .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      // console.log("jnfsjdkn", orders)
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

// res.render("shop", {
//   prods: products,
//   pageTitle: "Shop",
//   path: "/",
//   hasProducts: products.length > 0,
//   activeShop: true,
//   productCSS: true,
// });
