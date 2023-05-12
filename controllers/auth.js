const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator")

const User = require("../models/user");

let transporter = nodemailer.createTransport({
  // host: "live.smtp.mailtrap.io",
  service: "gmail",
  // port: 587,
  // secure: false, // true for 465, false for other ports
  auth: {
    user: "tyagidivyam21@gmail.com", // generated ethereal user
    pass: "luatdvejuhindnfr", // generated ethereal password
  },
});

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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      isAuthenticated: false,
      errorMessage: errors.array()[0].msg
    });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash('error', 'Invalid Email or Password');
        return res.redirect("/login");
      }
      const doMatch = bcrypt.compareSync(password, user.password);

      if (!doMatch) {
        req.flash('error', 'Invalid Email or Password');
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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      isAuthenticated: false,
      errorMessage: errors.array()[0].msg
    });
  }

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
    .then(() => {
      res.redirect("/login");
      return transporter.sendMail({
        from: "Fred Foo 👻", // sender address
        to: email, // list of receivers
        subject: "Account Created ✔", // Subject line
        text: "Your account has been successfully created", // plain text body
        html: "<b>Your account has been successfully created</b>", // html body
      })
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  // res.redirect("/");
};

exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  }
  else {
    message = null;
  }
  res.render("auth/reset", {
    path: "/resetPassword",
    pageTitle: "Reset Password",
    isAuthenticated: false,
    errorMessage: message
  });
}

exports.postReset = (req, res, next) => {
  const email = req.body.email;

  User.findOne({ email: req.body.email }).then((user) => {
    const userId = user._id.toString();

    if (!user) {
      req.flash('error', 'No account with that email found');
      return res.redirect("/resetPassword");
    }
    return transporter.sendMail({
      from: "Nodes Shop", // sender address
      to: email, // list of receivers
      subject: "Password Reset", // Subject line
      text: "Your account has been successfully created", // plain text body
      html: `
        <p>You requested a password resest</p>
        <p>Click this <a href="http://localhost:3000/newPassword/${userId}">link</a> to reset your password</p>
      `, // html body
    })
      .then(() => {
        res.redirect('/login');
      })
  }).catch((err) => {
    console.log(err);
  })
}

exports.getNewPassword = (req, res, next) => {
  const userId = req.params.userId;

  res.render("auth/new-password", {
    path: "/newPassword",
    pageTitle: "New Password",
    isAuthenticated: false,
    errorMessage: "",
    userId: userId
  });
}

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;

  User.findOne({ _id: userId })
    .then((user) => {
      const hashedPassword = bcrypt.hashSync(newPassword, 12);
      user.password = hashedPassword;
      user.save();
      res.redirect("/login");
    }).catch((err) => {
      console.log(err)
    })
}