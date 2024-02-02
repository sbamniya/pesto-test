const { Router } = require("express");
const { AuthController } = require("../controllers");
const { validate, authenticated } = require("../middlewares");
const { AuthValidations } = require("../validations");

const router = Router();

router.post(
  "/register",
  validate(AuthValidations.Signup),
  AuthController.signup
);

router.post(
  "/login",
  validate(AuthValidations.Login),
  AuthController.login
);

router.get("/me", authenticated, AuthController.me);

module.exports = router;
