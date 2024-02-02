const { body } = require("express-validator");

const Login = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const Signup = [
  ...Login,
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .bail()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("The passwords do not match"),
];

module.exports = {
  Login,
  Signup,
};
