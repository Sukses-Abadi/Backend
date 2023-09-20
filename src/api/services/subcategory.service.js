const { PrismaClient } = require("@prisma/client");
const CustomAPIError = require("../middlewares/custom-error");

const prisma = new PrismaClient();

const findAll = async (params) => {
  try {
    const filterOptions = {
      where: {},
      include: {
        Product: { include: { productDetails: true, productGalleries: true } },
      },
    };

    const { name } = params;

    if (name) {
      filterOptions.where.name = {
        contains: name,
        mode: "insensitive",
      };
    }
    const categories = await prisma.subCategory.findMany(filterOptions);
    return categories;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
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
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
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
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

const update = async (pathParams, params) => {
  const { id } = pathParams;
  const { name, category_id } = params;
  try {
    if (!id || !name || !category_id) {
      throw new CustomAPIError(
        "Invalid please provide all of the required fields",
        400
      );
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
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

const destroy = async (params) => {
  try {
    const { id } = params;
    const existingCategory = await prisma.subCategory.findUnique({
      where: { id: +id },
    });

    const categories = await prisma.subCategory.delete({
      where: {
        id: +id,
      },
    });

    return categories;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  destroy,
};
