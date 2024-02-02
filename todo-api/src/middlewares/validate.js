const { validationResult } = require("express-validator");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const validator = (validationRules) => {
  return async (req, res, next) => {
    await Promise.all(validationRules.map((rule) => rule.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const errorExtracted = errors.array().reduce((prev, err) => {
      if (prev[err.param]) {
        prev[err.param].push(err.msg);
        return prev;
      }
      return { ...prev, [err.path]: [err.msg] };
    }, {});

    return res.status(StatusCodes.BAD_REQUEST).json({
      code: "VALIDATION_ERRORS",
      message: ReasonPhrases.BAD_REQUEST,
      errors: errorExtracted,
    });
  };
};

module.exports = validator;
