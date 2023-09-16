const { PrismaClient } = require("@prisma/client");
const { use } = require("express/lib/router");

const prisma = new PrismaClient();

const findAll = async (params) => {
  try {
    const address = await prisma.address.findMany();
    return address;
  } catch (error) {
    throw error;
  }
};

const findOne = async (params) => {
  try {
    const { id } = params;
    const address = await prisma.address.findUnique({
      where: {
        id: +id,
      },
    });

    if (!address) {
      throw new CustomAPIError(`no User with id of ${id}`, 400);
    }

    return address;
  } catch (error) {
    throw error;
  }
};

const create = async (params) => {
  try {
    const { street, name, city_id, zip_code, user_id } = params;

    const address = await prisma.address.create({
      data: {
        street,
        name,
        city_id: +city_id,
        zip_code: +zip_code,
        user_id: +user_id,
      },
    });

    return address;
  } catch (error) {
    throw error;
  }
};

const update = async (user_id, params) => {
  try {
    const user = await prisma.user.findUnique({
      where: { user_id: user_id },
    });

    if (!user) {
      throw new CustomAPIError(`no user with id of ${id}`, 400);
    }
    const { street, name, city_id, zip_code } = params;

    const address = await prisma.address.update({
      where: {
        id: +id,
      },
      data: {
        street: street || user.street,
        name: name || user.name,
        city_id: +city_id || user.city_id,
        zip_code: +zip_code || user.zip_code,
      },
    });

    if (!user_id) {
      throw new CustomAPIError(`no address with id user of ${user_id}`, 400);
    }
    const updateAddress = await prisma.address.findUnique({
      where: { user_id: +user_id },
    });
    return updateAddress;
  } catch (error) {
    throw error;
  }
};

const destroy = async (params) => {
  try {
    const { id } = params;

    const address = await prisma.address.findUnique({
      where: { id: +id },
    });

    if (!address) {
      throw new CustomAPIError(`no user with id of ${id}`, 400);
    }

    await prisma.address.delete({
      where: {
        id: +id,
      },
    });
    return {
      deletedAddress: address,
    };
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
