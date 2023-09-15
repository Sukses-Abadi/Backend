const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const findAll = async (params) => {
  try {
    // const filterOptions = {
    //   where: {},
    // };

    // const { id, name, category_id } = params;

    // if (name) {
    //   filterOptions.where.name = name;
    // }

    // const includeCategory = {
    //   include: {
    //     Category: true,
    //   },
    // };

    // const categories = prisma.subCategory.findMany({
    //   where: {
    //     AND: [
    //       {
    //         category_id: +category_id,
    //       },
    //       {
    //         name: name,
    //       },
    //     ],
    //   },
    //   include: {
    //     Category: {
    //       select: {
    //         name: true,
    //       },
    //     },
    //   },
    // });
    const categories = prisma.subCategory.findMany(params);
    return categories;
  } catch (error) {
    throw error;
  }
};

const findOne = async (params) => {
  try {
    const { id } = params;

    const categories = prisma.subCategory.findUnique({
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

    const categories = prisma.subCategory.create({
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
  try {
    const { id } = pathParams;
    const { name, category_id } = params;

    const categories = prisma.subCategory.update({
      where: {
        id: +id,
      },
      data: {
        name: name,
        category_id: +category_id,
      },
    });

    return categories;
  } catch (error) {
    console.log(error);
  }
};

const destroy = async (params) => {
  try {
    const { id } = params;

    const categories = prisma.subCategory.delete({
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
