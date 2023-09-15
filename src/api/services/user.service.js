const prisma = require("../../lib/prisma");
const bcrypt = require("bcrypt");
const CustomAPIError = require("../middlewares/custom-error");
const { generateToken } = require("../../lib/jwt");

const fetchAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const fetchSingleUsersById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id: +id },
  });

  if (!user) {
    throw new CustomAPIError(`no User with id of ${id}`, 400);
  }
  return user;
};

const postUser = async (data) => {
  console.log(data);
  let { username, first_name, last_name, email, age, photo, password, phone } =
    data;

  // hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      first_name,
      last_name,
      email,
      age,
      photo,
      password: hashedPassword, // Use the hashed password here
      phone,
    },
  });

  return user;
};

const getUser = async (data) => {
  const { username, password } = data;
  if (!username) {
    throw new CustomAPIError("Invalid username or password", 401);
  }
  if (!password) {
    throw new CustomAPIError("Invalid username or password", 401);
  }
  // Step 1: Check if the username exists
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new CustomAPIError("Invalid username or password", 401);
  }

  // Step 2: Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new CustomAPIError("Invalid username or password", 401);
  }

  // Generate JWT token
  const token = generateToken(user);

  return token;
};

const putUser = async (pathParams, params) => {
  try {
    const { id } = pathParams;

    const user = await prisma.user.findUnique({
      where: { id: +id },
    });

    if (!user) {
      throw new CustomAPIError(`no user with id of ${id}`, 400);
    }

    const {
      username,
      first_name,
      last_name,
      email,
      age,
      photo,
      password,
      phone,
    } = params;

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        username: username || user.username,
        first_name: first_name || user.first_name,
        last_name: last_name || user.last_name,
        email: email || user.email,
        age: age || user.age,
        photo: photo || user.photo,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
      },
    });

    const updateUser = await prisma.user.findUnique({
      where: { id: +id },
    });
    return updateUser;
  } catch (error) {
    throw error;
  }
};

const destroyUser = async (params) => {
  try {
    const { id } = params;

    const user = await prisma.user.findUnique({
      where: { id: +id },
    });

    if (!user) {
      throw new CustomAPIError(`no user with id of ${id}`, 400);
    }

    await prisma.user.delete({
      where: {
        id: +id,
      },
    });

    return {
      deletedUser: user,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchAllUsers,
  fetchSingleUsersById,
  postUser,
  getUser,
  putUser,
  destroyUser,
};
