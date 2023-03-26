const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split(";")[1].trim().split("=")[1];
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  }
  else {
    message = null;
  }
  const isLoggedIn = req.session.isLoggedIn;
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  // res.setHeader("Set-Cookie", "loggedIn=true; HttpOnly");

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash('error', 'Invalid Email or Password');
        return res.redirect("/login");
      }
      const doMatch = bcrypt.compareSync(password, user.password);

      if (!doMatch) {
        return res.redirect("/login");
      }
      req.session.isLoggedIn = true;
      req.session.user = user;

      req.session.save((err) => {
        // To make sure that the session is created before continuing
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  }
  else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
    errorMessage: message
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash('error', 'Email already Exists')
        return res.redirect("/signup");
      }

      const hashedPassword = bcrypt.hashSync(password, 12);

      const user = new User({
        email: email,
        password: hashedPassword,
        cart: { items: [] },
      });

      return user.save();
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
  // res.redirect("/");
};
