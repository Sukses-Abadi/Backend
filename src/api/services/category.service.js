const { PrismaClient } = require("@prisma/client");
const CustomAPIError = require("../middlewares/custom-error");
const prisma = new PrismaClient();

const findAll = async (params) => {
  const filterOptions = {
    where: {},
    include: {
      SubCategory: true,
      Product: { include: { productDetails: true, productGalleries: true } },
    },
    orderBy: {
      id: "asc", // Order by id in ascending order
    },
  };

  const { name } = params;

  if (name) {
    filterOptions.where.name = {
      contains: name,
      mode: "insensitive",
    };
  }

  const categories = await prisma.category.findMany(filterOptions);

  return categories;
};

const findOne = async (params) => {
  try {
    const { id } = params;
    const categories = prisma.category.findUnique({
      where: {
        id: +id,
      },
      include: {
        Product: { include: { productDetails: true, productGalleries: true } },
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
    const { name } = params;
    const categories = prisma.category.create({
      data: {
        name,
      },
    });
    return categories;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error creating category: ${error.message}`, 500);
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

    const categories = prisma.category.update({
      where: {
        id: +id,
      },
      data: {
        name: name,
      },
      orderBy: {
        id: "asc", // Order by id in ascending order
      },
    });

    return categories;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

const destroy = async (params) => {
  try {
    const { id } = params;

    const categories = prisma.category.delete({
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
