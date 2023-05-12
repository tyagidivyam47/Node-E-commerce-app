const express = require("express");
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");

const route = express.Router();

route.get("/login", authController.getLogin);

route.post("/login", [
    check('email').isEmail().withMessage("Enter a valid Email🙏️")
], authController.postLogin);

route.post("/logout", authController.postLogout);

route.get("/signup", authController.getSignup);

route.post("/signup", [
    check('email').isEmail().withMessage("Please enter a valid Email🙏️").normalizeEmail(),
    body('password', "Please enter an alphanumeric password with length greater than 5").isLength({ min: 5 }).isAlphanumeric().trim(),
    body('confirmPassword').trim().custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    })], authController.postSignup);

route.get("/resetPassword", authController.getReset);

route.post("/resetPassword", authController.postReset);

route.get("/newPassword/:userId", authController.getNewPassword);

route.post("/newPassword", authController.postNewPassword);

module.exports = route;
