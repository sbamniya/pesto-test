const { Router } = require("express");
const { UserController } = require("../controllers");
const { authenticated } = require("../middlewares");

const router = Router();

router.get("/", authenticated, UserController.getAll);

module.exports = router;
