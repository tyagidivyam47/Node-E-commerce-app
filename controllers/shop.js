const fs = require('fs');
const pdfDocument = require('pdfkit');
const stripe = require('stripe')('sk_test_51N5kQ7SDjOf0xQq42DVdkCTMqpoP6pHk4IaIiywZ86YqnauLpqJxwosckGFsdJb9wBdsTSvPjuhpCVEz5RrDmQBE00VBTkAmHq');


const products = [];
const Product = require("../models/product");
const Order = require("../models/order");
const path = require('path');
const order = require('../models/order');
// const Cart = require("../models/cart");
// const { where } = require("sequelize");

const ITEMS_PER_PAGE = 2;

exports.getProducts = (req, res, next) => {
  // Product.find()
  //   // .populate("userId")   This will populate usefr information in the fetched data
  //   .then((products) => {
  //     res.render("shop/product-list", {
  //       prods: products,
  //       pageTitle: "All Products",
  //       path: "/products",
  //       isAuthenticated: req.session.isLoggedIn,
  //     });
  //   })
  //   .catch((err) => console.log(err));


  const page = +req.query.page || 1;
  let totalItems;

  Product.find().countDocuments().then(numProducts => {
    totalItems = numProducts;
    return Product.find()
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
  })
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
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
  const page = +req.query.page || 1;
  let totalItems;

  Product.find().countDocuments().then(numProducts => {
    totalItems = numProducts;
    return Product.find()
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
  })
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
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
  let products;
  let total = 0;

  req.user
    // .select("cart")
    .populate("cart.items.productId")
    .then((user) => {
      products = user.cart.items;
      total = 0;

      products.forEach((p => {
        total += p.quantity + p.productId.price;
      }))

      return stripe.checkout.sessions.create({
        // line_items: 
        //   products.map((p) => {
        //     return {
        //       price_data: {
        //         currency: 'inr',
        //         product_data: {
        //           name: p.productId.title,
        //           // description: p.productId.description,
        //           unit_amount: p.productId.price * 100,
        //         },
        //       },
        //       quantity: p.quantity,
        //     }
        //   }),

        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: 'T-shirt',
              },
              unit_amount: 100,
              tax_behavior: 'exclusive',
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
              maximum: 10,
            },
            quantity: 1,
          },
        ],

        mode: 'payment',
        success_url: req.protocol + "://" + req.get('host') + "/checkout/success",
        cancel_url: req.protocol + "://" + req.get('host') + "/checkout/cancel",
      });
    })
    .then((session) => {
      res.render("shop/checkout", {
        path: "/checkout",
        pageTitle: "Checkout",
        products: products,
        totalSum: total,
        isAuthenticated: req.session.isLoggedIn,
        sessionId: session.id,
      });
    })
    .catch((err) => console.log(err));

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

exports.getCheckoutSuccess = (req, res, next) => {
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

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  const invoiceName = 'invoice-' + orderId + '.pdf';
  const invoicePath = path.join('data', 'Invoices', invoiceName);

  Order.findById(orderId).then((order) => {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline');

    const pdfDoc = new pdfDocument();
    // pdfDoc.pipe(fs.createWriteStream(invoicePath));
    pdfDoc.pipe(res);

    pdfDoc.fontSize(26).text("Invoice", {
      underline: true
    });

    pdfDoc.text("------------------------------------------------");

    order.products.forEach((prod) => {
      console.log("afasd : " + prod.product.title);
      pdfDoc.text(prod.product.title + " X " + prod.quantity + " - $ " + prod.product.price);
    })

    pdfDoc.end();
  })
    .catch((err) => {
      console.log(err);
      res.redirect("/500");
    })





  //   ** This may cause server memory overflow

  // fs.readFile(invoicePath, (err, data) => {
  //   if (err) {
  //     res.redirect('/500');
  //   }
  //   // console.log("faads : ", data);
  //   res.setHeader('Content-Type', 'application/pdf'); 
  //   res.setHeader('Content-Disposition', 'inline');
  //   res.send(data);
  // })

  //  ** Use This Instead

  // const file = fs.createReadStream(invoicePath);
  // file.pipe(res);

}

// res.render("shop", {
//   prods: products,
//   pageTitle: "Shop",
//   path: "/",
//   hasProducts: products.length > 0,
//   activeShop: true,
//   productCSS: true,
// });
