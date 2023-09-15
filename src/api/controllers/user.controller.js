const {
  postUser,
  getUser,
  putUser,
  destroyUser,
} = require("../services/user.service");

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

const updateUser = async (req, res) => {
  const user = await putUser(req.params, req.body);
  return res.json({
    status: "success",
    message: "User is updated successfully",
    data: user,
  });
};

const deleteUser = async (req, res) => {
  const user = await destroyUser(req.params);
  return res.json({
    status: "success",
    message: "User is deleted successfully",
    data: user,
  });
};

module.exports = { registerUser, updateUser, loginUser, deleteUser };
