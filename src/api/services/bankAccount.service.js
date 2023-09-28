const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const fetchBankAccount = async (params) => {
  if (params) {
    const { id } = params;
    const result = await prisma.bankAccount.findMany({});

    return result;
  }

  const result = await prisma.bankAccount.findMany();
  return result;
};

const postBankAccount = async (user, payload) => {
  const { id } = user;
  try {
    const result = await prisma.bankAccount.create({
      data: {
        account_holder: payload.account_holder,
        bank_name: payload.bank_name,
        account_number: payload.account_number,
        admin_id: id,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

const putBankAccount = async (params, payload) => {
  const { id } = params;
  try {
    const result = await prisma.bankAccount.update({
      where: {
        id: +id,
      },
      data: {
        account_holder: payload.account_holder,
        bank_name: payload.bank_name,
        account_number: payload.account_number,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

const destroyBankAccount = async (params) => {
  const { id } = params;
  try {
    const result = await prisma.bankAccount.delete({
      where: {
        id: +id,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

module.exports = {
  fetchBankAccount,
  postBankAccount,
  putBankAccount,
  destroyBankAccount,
};
