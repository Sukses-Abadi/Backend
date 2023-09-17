const { PrismaClient } = require("@prisma/client");
const CustomAPIError = require("../middlewares/custom-error");

const prisma = new PrismaClient();

const findAll = async (params) => {
  try {
    const categories = await prisma.subCategory.findMany(params);
    return categories;
  } catch (error) {
    throw error;
  }
};

const findOne = async (params) => {
  try {
    const { id } = params;
    const categories = await prisma.subCategory.findUnique({
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
    const { name, category_id } = params;
    if (!name || !category_id) {
      throw new CustomAPIError(
        "Invalid please provide all of the required fields",
        400
      );
    }
    const categories = await prisma.subCategory.create({
      data: {
        name: name,
        category_id: +category_id,
      },
    });
    return categories;
  } catch (error) {
    throw error;
  }
};

const update = async (pathParams, params) => {
  const { id } = pathParams;
  const { name, category_id } = params;
  if (!id || !name || !category_id) {
    throw new CustomAPIError(
      "Invalid please provide all of the required fields",
      400
    );
  }
  const existingCategory = await prisma.subCategory.findUnique({
    where: { id: +id },
  });
  if (!existingCategory) {
    throw new CustomAPIError(`No sub category with id ${id}`, 400);
  }
  const updatedCategory = await prisma.subCategory.update({
    where: {
      id: +id,
    },
    data: {
      name: name,
      category_id: +category_id,
    },
  });

  return updatedCategory;
};

const destroy = async (params) => {
  try {
    const { id } = params;
    const existingCategory = await prisma.subCategory.findUnique({
      where: { id: +id },
    });
    if (!existingCategory) {
      throw new CustomAPIError(`No sub category with id ${id}`, 400);
    }
    console.log(id);
    const categories = await prisma.subCategory.delete({
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
