const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../lib/jwt");

const loginAdmin = async (payload) => {
  const { username, password } = payload;
  try {
    const admin = await prisma.admin.findUnique({ where: { username } });
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      throw new CustomAPIError("Invalid credentials", 400);
    }

    const token = generateToken(admin);
    return token;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error creating category: ${error.message}`, 500);
  }
};

const postAdmin = async (payload) => {
  const { username, password } = payload;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error creating category: ${error.message}`, 500);
  }
};

const putAdmin = async (params, payload) => {
  const { username, password } = payload;
  const { id } = params;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.admin.update({
      where: {
        id: +id,
      },
      data: { username, password: hashedPassword },
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error creating category: ${error.message}`, 500);
  }
};

const destroyAdmin = async (params) => {
  const { id } = params;
  try {
    const result = await prisma.admin.delete({
      where: {
        id: +id,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error creating category: ${error.message}`, 500);
  }
};

module.exports = {
  loginAdmin,
  postAdmin,
  putAdmin,
  destroyAdmin,
};
