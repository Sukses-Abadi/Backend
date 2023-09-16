const {
  fetchAllUsers,
  fetchSingleUsersById,
  destroyUser,
} = require("../../services/user.service");

const getAllUsersCMS = async (req, res) => {
  const users = await fetchAllUsers();
  return res.json({
    status: "success",
    message: "User fetched successfully",
    data: users,
  });
};

const getSingleUserCMS = async (req, res) => {
  const users = await fetchSingleUsersById(req.params.id);
  return res.json({
    status: "success",
    message: "User is created successfully",
    data: users,
  });
};

const deleteUserCMS = async (req, res) => {
  const user = await destroyUser(req.params);
  res.json({
    status: "success",
    message: "User deleted successfully",
    data: user,
  });
};
module.exports = { getAllUsersCMS, getSingleUserCMS, deleteUserCMS };
