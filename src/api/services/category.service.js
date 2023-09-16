const { PrismaClient } = require("@prisma/client");
const CustomAPIError = require("../middlewares/custom-error");
const prisma = new PrismaClient();

const findAll = async (params) => {
  const filterOptions = {
    where: {},
  };

  const { name } = params;

  if (name) {
    filterOptions.where.name = name;
  }

  const categories = await prisma.category.findMany(filterOptions);
  return categories;
};

const findOne = async (params) => {
  try {
    const { id } = params;
    if (!id) {
      throw new CustomAPIError(
        "Invalid please provide all of the required fields",
        400
      );
    }
    const existingCategory = await prisma.category.findUnique({
      where: { id: +id },
    });
    if (!existingCategory) {
      throw new CustomAPIError(`No sub category with id of ${id}`, 400);
    }
    const categories = prisma.category.findUnique({
      where: {
        id: +id,
      },
    });
    return categories;
  } catch (error) {
    throw error;
  }
};

const create = async (params) => {
  try {
    const { name } = params;

    const categories = prisma.category.create({
      data: {
        name,
      },
    });
    return categories;
  } catch (error) {
    throw error;
  }
};

const update = async (pathParams, params) => {
  try {
    const { id } = pathParams;
    const { name } = params;
    if (!id || !name) {
      throw new CustomAPIError(
        "Invalid please provide all of the required fields",
        400
      );
    }
    const existingCategory = await prisma.category.findUnique({
      where: { id: +id },
    });
    if (!existingCategory) {
      throw new CustomAPIError(`No sub category with id of ${id}`, 400);
    }
    const categories = prisma.category.update({
      where: {
        id: +id,
      },
      data: {
        name: name,
      },
    });

    return categories;
  } catch (error) {
    throw error;
  }
};

const destroy = async (params) => {
  try {
    const { id } = params;
    if (!id) {
      throw new CustomAPIError(
        "Invalid please provide all of the required fields",
        400
      );
    }
    const existingCategory = await prisma.category.findUnique({
      where: { id: +id },
    });
    if (!existingCategory) {
      throw new CustomAPIError(`No category with id of ${id}`, 400);
    }
    const categories = prisma.category.delete({
      where: {
        id: +id,
      },
    });
    return categories;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  destroy,
};
