const { postUser, getUser } = require("../services/user.service");

const registerUser = async (req, res) => {
  const user = await postUser(req.body);
  return res.json({
    status: "success",
    message: "User is created successfully",
    data: user,
  });
};

const loginUser = async (req, res) => {
  const token = await getUser(req.body);
  return res.json({
    status: "success",
    message: "User is credential matched! Here is your token",
    data: token,
  });
};
const updateUser = async (req, res) => {};

module.exports = { registerUser, updateUser, loginUser };
