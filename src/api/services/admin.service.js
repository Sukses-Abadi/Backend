const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../lib/jwt");

const loginAdmin = async (payload) => {
  const { username, password } = payload;
  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) {
    throw new CustomAPIError("Invalid credentials", 400);
  }

  const passwordMatch = await bcrypt.compare(password, admin.password);
  if (!passwordMatch) {
    throw new CustomAPIError("Invalid credentials", 400);
  }

  const token = generateToken(admin);

  return token;
};

const postAdmin = async (payload) => {
  const { username, password } = payload;
  const existingAdmin = await prisma.admin.findUnique({
    where: {
      username: username,
    },
  });

  if (existingAdmin) {
    throw new CustomAPIError("Username already exist!", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await prisma.admin.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  return result;
};

const putAdmin = async (params, payload) => {
  const { username, password } = payload;
  const { id } = params;

  const admin = await prisma.admin.findUnique({
    where: {
      id: +id,
    },
  });

  if (!admin) {
    throw new CustomAPIError(`No admin with id ${id}`, 400);
  }

  if (admin.username !== username) {
    const existingUsername = await prisma.admin.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUsername) {
      throw new CustomAPIError("Username already exist", 400);
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await prisma.admin.update({
    where: {
      id: +id,
    },
    data: { username, password: hashedPassword },
  });

  return result;
};

const destroyAdmin = async (params) => {
  const { id } = params;

  const admin = await prisma.admin.findUnique({
    where: {
      id: +id,
    },
  });

  if (!admin) {
    throw new CustomAPIError(`No admin with id ${id}`, 400);
  }

  const result = await prisma.admin.delete({
    where: {
      id: +id,
    },
  });

  return result;
};

module.exports = {
  loginAdmin,
  postAdmin,
  putAdmin,
  destroyAdmin,
};
