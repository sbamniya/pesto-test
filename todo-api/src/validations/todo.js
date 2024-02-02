const { body } = require("express-validator");
const prisma = require("../prisma");
const { TodoStatus } = require("@prisma/client");
function isValidDate(dateString) {
  const dateObject = new Date(dateString);
  return !isNaN(dateObject.getTime()) && dateString.trim() !== "";
}
const Create = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description")
    .optional({
      nullable: true,
    })
    .bail()
    .isString()
    .withMessage("Description should be string"),
  body("dueDate")
    .optional({
      nullable: true,
    })
    .bail()
    .custom((value) => isValidDate(value))
    .withMessage("Due date should be valid date."),
  ,
  body("assignedTo")
    .optional({
      nullable: true,
    })
    .bail()
    .isNumeric()
    .withMessage("Assigned to should be a number")
    .bail()
    .custom(async (value) => {
      const userExists = await prisma.user.count({
        where: {
          id: value,
        },
        select: {
          id: true,
        },
      });
      if (!userExists) {
        return Promise.reject("User does not exist");
      }
      return true;
    })
    .withMessage("Assigned to should be a number"),
  body("status")
    .optional({
      nullable: true,
    })
    .bail()
    .isIn([TodoStatus.Pending, TodoStatus.Inprogress, TodoStatus.Completed])
    .withMessage(
      "Invalid status, valid values are Pending, Inprogress, Completed"
    ),
];

module.exports = {
  Create,
};
