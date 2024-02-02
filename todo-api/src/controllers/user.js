const { StatusCodes } = require("http-status-codes");
const prisma = require("../prisma");

const getAll = async (req, res) => {
  try {
    const {
      limit = 1000,
      page = 1,
      search = "",
      sort = "createdAt,asc",
    } = req.query;

    const where = {};

    if (search) {
      where.username = {
        contains: search,
        mode: "insensitive",
      };
    }
    const [sortBy, orderBy] = sort.split(",");
    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        [sortBy]: orderBy,
      },
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
    });
    const total = await prisma.user.count({
      where,
    });
    return res.status(StatusCodes.OK).json({
      data: users,
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

module.exports = {
  getAll,
};
