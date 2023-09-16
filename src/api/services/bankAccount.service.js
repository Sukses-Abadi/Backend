const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const fetchBankAccount = async (params) => {
  if (params) {
    const { id } = params;
    const result = await prisma.bankAccount.findMany({
      where: {
        admin_id: id,
      },
    });

    return result;
  }

  const result = await prisma.bankAccount.findMany();
  return result;
};

const postBankAccount = async (user, payload) => {
  const { id } = user;

  const existingBankAccount = await prisma.bankAccount.findUnique({
    where: {
      account_number: payload.account_number,
    },
  });

  if (existingBankAccount) {
    throw new CustomAPIError("Account number already exist!", 400);
  }

  const result = await prisma.bankAccount.create({
    data: {
      account_holder: payload.account_holder,
      bank_name: payload.bank_name,
      account_number: payload.account_number,
      admin_id: id,
    },
  });

  return result;
};

const putBankAccount = async (params, payload) => {
  const { id } = params;

  const existingBankAccount = await prisma.bankAccount.findUnique({
    where: {
      account_number: payload.account_number,
    },
  });

  if (existingBankAccount) {
    throw new CustomAPIError("Account number already exist", 400);
  }

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
};

const destroyBankAccount = async (params) => {
  const { id } = params;
  const bankAccount = await prisma.bankAccount.findUnique({
    where: {
      id: +id,
    },
  });

  if (!bankAccount) {
    throw new CustomAPIError(`No bank account with id ${id}`, 400);
  }

  const result = await prisma.bankAccount.delete({
    where: {
      id: +id,
    },
  });

  return result;
};

module.exports = {
  fetchBankAccount,
  postBankAccount,
  putBankAccount,
  destroyBankAccount,
};
