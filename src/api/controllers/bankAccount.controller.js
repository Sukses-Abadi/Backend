const { fetchBankAccount } = require("../services/bankAccount.service");

const getAllBankAccount = async (req, res) => {
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

module.exports = {
  getAllBankAccount,
};
