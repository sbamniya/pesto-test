const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const prisma = require("../prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        password: true,
      },
    });
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        code: "USER_NOT_FOUND",
        message: ReasonPhrases.BAD_REQUEST,
        errors: [
          {
            username: "User not found",
          },
        ],
      });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        code: "PASSWORD_MISMATCH",
        message: ReasonPhrases.BAD_REQUEST,
        errors: [
          {
            password: "Password mismatch",
          },
        ],
      });
    }
    
    await prisma.loginArchive.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        loginIp: req.ip,
      },
    })
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }
};

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userCount = await prisma.user.count({
      where: {
        username,
      },
    });
    if (userCount) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        code: "USER_EXISTS",
        message: ReasonPhrases.BAD_REQUEST,
        errors: [
          {
            username: "Username already taken.",
          },
        ],
      });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }
};

const me = async (req, res) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: req.userId,
      },
      select: {
        id: true,
        username: true,
        loginArchive: {
          select: {
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }
};

module.exports = {
  login,
  signup,
  me,
};
