const {
  fetchBankAccount,
  postBankAccount,
  putBankAccount,
  destroyBankAccount,
} = require("../../services/bankAccount.service");

const getBankAccount = async (req, res) => {
  try {
    const result = await fetchBankAccount();
    res.json({
      status: "success",
      message: "Get Bank Account success",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const createBankAccount = async (req, res) => {
  const result = await postBankAccount(req.body);

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
  getBankAccount,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
};
