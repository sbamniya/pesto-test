const jwt = require("jsonwebtoken");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const authenticated = (req, res, next) => {
  try {
    const user = jwt.verify(req.headers.authorization.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.userId = user.id;

    return next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ code: "UNAUTHORIZED", message: ReasonPhrases.UNAUTHORIZED });
  }
};

module.exports = authenticated;
