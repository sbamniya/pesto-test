const { Router } = require("express");
const { TodoController } = require("../controllers");
const { validate, authenticated } = require("../middlewares");
const { TodoValidations } = require("../validations");

const router = Router();

router
  .route("/")
  .all(authenticated)
  .post(validate(TodoValidations.Create), TodoController.create)
  .get(TodoController.getAll);

router
  .route("/:id")
  .all(authenticated)
  .put(validate(TodoValidations.Create), TodoController.update);

module.exports = router;
