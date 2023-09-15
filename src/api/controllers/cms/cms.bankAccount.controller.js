const {
  fetchBankAccount,
  postBankAccount,
  putBankAccount,
  destroyBankAccount,
} = require("../../services/bankAccount.service");

const getAllBankAccount = async (req, res) => {
  const result = await fetchBankAccount(req.user);
  res.json({
    status: "success",
    message: "Get Bank Account success",
    data: result,
  });
};

const createBankAccount = async (req, res) => {
  const result = await postBankAccount(req.user, req.body);

  res.status(201).json({
    status: "success",
    message: "Bank Account is created",
    data: result,
  });
};

const updateBankAccount = async (req, res) => {
  const result = await putBankAccount(req.params, req.body);

  return res.status(200).json({
    status: "success",
    message: "Bank Account is updated",
    data: result,
  });
};

const deleteBankAccount = async (req, res) => {
  const result = await destroyBankAccount(req.params);

  res.status(200).json({
    status: "success",
    message: "Bank Account is deleted",
    data: result,
  });
};

module.exports = {
  getAllBankAccount,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
};
