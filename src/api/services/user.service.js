const prisma = require("../../lib/prisma");
const bcrypt = require("bcryptjs");
const CustomAPIError = require("../middlewares/custom-error");
const { generateToken } = require("../../lib/jwt");

const fetchAllUsers = async () => {
  const users = await prisma.user.findMany({
    include: {
      cart: { include: { CartProduct: true } },
      Order: true,
      reviews: true,
      address: { include: { city: true } },
    },
  });
  return users;
};

const fetchSingleUsersById = async (params) => {
  const { id } = params;
  const user = await prisma.user.findUnique({
    where: { id: +id },
    include: {
      cart: { include: { CartProduct: true } },
      Order: true,
      reviews: true,
      address: { include: { city: true } },
    },
  });

  if (!user) {
    throw new CustomAPIError(`No user with id ${id}`, 400);
  }
  return user;
};

const postUser = async (data) => {
  let { username, first_name, last_name, email, photo, password, phone } = data;

  try {
    const existedUserUsername = await prisma.user.findUnique({
      where: { username: username },
    });
    if (existedUserUsername) {
      throw new CustomAPIError(`Username is taken`, 400);
    }
    const existedUserEmail = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existedUserEmail) {
      throw new CustomAPIError(`Email is registered before`, 400);
    }

    // hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.$transaction(async (tx) => {
      const createdUser = await tx.user.create({
        data: {
          username,
          first_name,
          last_name,
          email,
          photo,
          password: hashedPassword, // Use the hashed password here
          phone,
        },
        include: {
          cart: { include: { CartProduct: true } },
          Order: true,
          reviews: true,
          address: { include: { city: true } },
        },
      });
      await tx.cart.create({ data: { user_id: createdUser.id } });
      return createdUser;
    });
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`${error.message}`, 500);
  }
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
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

const destroyUser = async (params) => {
  // console.log(params);
  try {
    const { id } = params;

    const user = await prisma.user.findUnique({
      where: { id: +id },
    });

    if (!user) {
      throw new CustomAPIError(`No user with id ${id}`, 400);
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
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
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
