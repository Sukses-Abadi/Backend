const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const CustomAPIError = require("../middlewares/custom-error");

const findAll = async (user_id) => {
  try {
    const address = await prisma.address.findMany({
      where: {
        user_id: user_id,
      },
    });

    if (!address[0]) {
      throw new CustomAPIError(`No User Address with id of ${user_id}`, 400);
    }

    return address;
  } catch (error) {
    throw new CustomAPIError(`Error creating category: ${error.message}`, 500);
  }
};

const create = async (user_id, params) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    const { street, name, city_id, zip_code } = params;

    const address = await prisma.address.create({
      data: {
        street,
        name,
        city_id: +city_id,
        zip_code: +zip_code,
        user_id: user.id,
      },
    });

    return address;
  } catch (error) {
    throw new CustomAPIError(`Error creating category: ${error.message}`, 500);
  }
};

const update = async (user_id, params) => {
  // try {
  const address = await prisma.address.findUnique({
    where: { id: params.id },
  });
  if (!address) {
    throw new CustomAPIError(
      "Address with id " + params.id + " not found",
      400
    );
  }
  const { street, name, city_id, zip_code } = params;

  await prisma.address.update({
    where: {
      id: address.id,
    },
    data: {
      street: street || address.street,
      name: name || address.name,
      city_id: +city_id || address.city_id,
      zip_code: +zip_code || address.zip_code,
    },
  });

  const updateAddress = await prisma.address.findUnique({
    where: { id: params.id },
  });

  return updateAddress;
  // } catch (error) {
  //   throw new CustomAPIError(`Error updating category: ${error.message}`, 500);
  // }
};

const destroy = async (user_id, params) => {
  // try {
  const address = await prisma.address.findUnique({
    where: { id: params.id },
  });
  if (!address) {
    throw new CustomAPIError(
      "Address with id " + params.id + " not found",
      400
    );
  }
  await prisma.address.delete({
    where: {
      id: address.id,
    },
  });
  return {
    deletedAddress: address,
  };
  // } catch (error) {
  //   throw new CustomAPIError(`Error creating category: ${error.message}`, 500);
  // }
};

module.exports = {
  findAll,
  create,
  update,
  destroy,
};
