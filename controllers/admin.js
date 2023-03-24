const Product = require("../models/product");

// const mongodb = require("mongodb");

exports.getAddProducts = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postAddProducts = (req, res, next) => {
  // console.log(req.body);
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;

  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user._id,
    // null,
    // req.user._id
  });

  product
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/products");
    })
    .catch((err) => console.log(err));

  // With Sequelize

  // req.user
  //   .createProduct({
  //     title: title,
  //     imgUrl: imageUrl,
  //     description: description,
  //     price: price,
  //   })
  //   .then((result) => {
  //     console.log("Created Product");
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => console.log(err));

  // Alternate Method

  // Product.create({
  //   title: title,
  //   imgUrl: imageUrl,
  //   description: description,
  //   price: price,
  //   userId: req.user.id,
  // })
  //   .then((result) => {
  //     console.log("Created Product");
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => console.log(err));

  // Without Sequelize

  // const product = new Product(
  //   null,
  //   req.body.title,
  //   req.body.imageUrl,
  //   req.body.description,
  //   req.body.price
  // );

  // product
  //   .save()
  //   .then(res.redirect("/"))
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // By File System

  // product.save();
  // res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));

  // With Sequelize

  // req.user
  //   .getProducts()
  //   // Product.findAll()
  //   .then((products) => {
  //     res.render("admin/products", {
  //       prods: products,
  //       pageTitle: "Admin Products",
  //       path: "/admin/products",
  //     });
  //   })
  //   .catch((err) => console.log(err));

  // Without Using Sequelize

  // Product.fetchAll((products) => {
  //   res.render("admin/products", {
  //     prods: products,
  //     pageTitle: "Admin Products",
  //     path: "/admin/products",
  //   });
  // });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((product) => {
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/edit-product",
        editing: editMode,
        product: product,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));

  // With Sequelize

  // req.user
  //   .getProducts({ where: { id: prodId } })
  //   // Product.findByPk(prodId)
  //   .then((products) => {
  //     const product = products[0];
  //     if (!product) {
  //       return res.redirect("/");
  //     }
  //     res.render("admin/edit-product", {
  //       pageTitle: "Edit Product",
  //       path: "/edit-product",
  //       editing: editMode,
  //       product: product,
  //     });
  //   })
  //   .catch((err) => console.log(err));

  // Without Sequelize

  // Product.findById(prodId, (product) => {
  //   if (!product) {
  //     return res.redirect("/");
  //   }
  //   res.render("admin/edit-product", {
  //     pageTitle: "Edit Product",
  //     path: "/edit-product",
  //     editing: editMode,
  //     product: product,
  //     // formsCSS: true,
  //     // productCSS: true,
  //     // activeAddProduct: true,
  //   });
  // });
};

exports.postEditProducts = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImgUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;

  Product.findById(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescription;
      product.imageUrl = updatedImgUrl;
      return product.save();
    })
    .then(() => {
      console.log("Updated Product!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));

  // Using mongoDB

  // const objectId = new mongodb.ObjectId(prodId);

  // const product = new Product(
  //   updatedTitle,
  //   updatedPrice,
  //   updatedDescription,
  //   updatedImgUrl,
  //   objectId
  // );

  // product
  //   .save()
  //   .then(() => {
  //     console.log("Updated Product!");
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => console.log(err));

  // using Sequelize

  // Product.findByPk(prodId)
  //   .then((product) => {
  //     product.title = updatedTitle;
  //     product.price = updatedPrice;
  //     product.imgUrl = updatedImgUrl;
  //     product.description = updatedDescription;

  //     product.save();
  //   })
  //   .then((result) => {
  //     console.log("updated");
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => console.log(err));

  //   const updatedProduct = new Product(
  //     prodId,
  //     updatedTitle,
  //     updatedImgUrl,
  //     updatedDescription,
  //     updatedPrice
  //   );

  //   updatedProduct.save();

  //   res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findByIdAndDelete(prodId)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));

  // Using mongoDB

  // Product.deleteById(prodId)
  //   .then(() => {
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => console.log(err));

  // With Sequelize

  // Product.findByPk(prodId)
  //   .then((product) => {
  //     return product.destroy();
  //   })
  //   .then((result) => {
  //     console.log("Product Deleted");
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => console.log(err));
  // Product.deleteProductById(req.body.productId);
  // res.redirect("/admin/products");
};
