const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { successResponse } = require("../../lib/response");

const getAdmin = async (req, res, next) => {
  try {
    const result = await prisma.admin.findMany();

    return res.status(200).json(
      successResponse({
        message: "Get Admin success",
        data: result,
      })
    );
  } catch (error) {
    next(error);
  }
};

const createAdmin = async (req, res, next) => {
  try {
    const data = req.body;
    const existingAdmin = await prisma.admin.findUnique({
      where: {
        username: data.username,
      },
    });
    if (existingAdmin) {
      return res.status(400).json({ message: "Username already exist!" });
    }

    const result = await prisma.admin.create({
      data: data,
    });

    return res.status(201).json(
      successResponse({
        message: "Admin is created",
        data: result,
      })
    );
  } catch (error) {
    next(error);
  }
};

const updateAdmin = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const existingUsername = await prisma.admin.findUnique({
      where: {
        username: data.username,
      },
    });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exist" });
    }

    const result = await prisma.admin.update({
      where: {
        id: Number(id),
      },
      data: data,
    });

    return res.status(200).json(
      successResponse({
        message: `Admin Id ${id} is updated`,
        data: result,
      })
    );
  } catch (error) {
    next(error);
  }
};

const deleteAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.admin.delete({
      where: {
        id: Number(id),
      },
    });
    if (!id) {
      return res.status(404).json({ message: "Id not found!" });
    }

    return res.status(200).json(
      successResponse({
        message: `Admin Id ${id} is deleted`,
      })
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { getAdmin, createAdmin, updateAdmin, deleteAdmin };
