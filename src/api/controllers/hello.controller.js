const { successResponse } = require("../../lib/response");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class HelloController {
  static get = async (_, res, next) => {
    try {
      const data = await prisma.category.findMany();
      return res.status(200).json(
        successResponse({
          message: "Hello World",
          data,
        })
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = HelloController;
