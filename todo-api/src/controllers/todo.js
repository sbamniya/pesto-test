const { StatusCodes } = require("http-status-codes");
const prisma = require("../prisma");

const create = async (req, res) => {
  try {
    const { title, description, dueDate, assignedTo, status } = req.body;
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        dueDate,
        status,
        createdBy: req.userId,
        assignedTo,
      },
    });
    return res.status(StatusCodes.CREATED).json(todo);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const {
      limit = 1000,
      page = 1,
      search = "",
      status = "",
      sort = "createdAt,desc",
    } = req.query;

    const where = {
      AND: [
        {
          OR: [
            {
              createdBy: req.userId,
            },
            {
              assignedTo: req.userId,
            },
          ],
        },
      ],
    };

    if (search) {
      where.AND.push({
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      });
    }
    if (status) {
      where.status = status;
    }
    const [sortBy, orderBy] = sort.split(",");
    const todos = await prisma.todo.findMany({
      where,
      include: {
        assignee: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        [sortBy]: orderBy,
      },
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
    });
    const total = await prisma.todo.count({
      where,
    });
    return res.status(StatusCodes.OK).json({
      data: todos,
      total,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { title, description, dueDate, assignedTo, status } = req.body;
    const updatedTodo = await prisma.todo.update({
      where: {
        id: Number(req.params.id),
        OR: [
          {
            createdBy: req.userId,
          },
          {
            assignedTo: req.userId,
          },
        ],
      },
      data: {
        title,
        description,
        dueDate,
        status,
        createdBy: req.userId,
        assignedTo,
      },
    });
    return res.status(StatusCodes.OK).json(updatedTodo);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }
};

module.exports = {
  create,
  getAll,
  update,
};
