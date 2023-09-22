const {
  postUser,
  getUser,
  putUser,
  destroyUser,
  fetchAllUsers,
  fetchSingleUsersById,
} = require("../services/user.service");

const registerUser = async (req, res) => {
  console.log(req.body);
  const user = await postUser(req.body);
  return res.json({
    status: "success",
    message: "User is created successfully",
    data: user,
  });
};

const getUserId = async (req, res) => {
  const user = await fetchSingleUsersById(req.user);
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
  const user = await putUser(req.user, req.body);
  return res.json({
    status: "success",
    message: "User is updated successfully",
    data: user,
  });
};

const deleteUser = async (req, res) => {
  const user = await destroyUser(req.user);
  return res.json({
    status: "success",
    message: "User is deleted successfully",
    data: user,
  });
};

module.exports = { registerUser, updateUser, loginUser, deleteUser, getUserId };
