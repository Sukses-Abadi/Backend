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

const postBankAccount = async (params, payload) => {
  const { id } = params;

  const existingBankAccount = await prisma.bankAccount.findUnique({
    where: {
      account_number: payload.account_number,
    },
  });

  if (existingBankAccount) {
    throw new CustomAPIError("Bank account already exist!", 400);
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
  const data = payload;
  const { id } = params;
  const accNum = data.account_number;
  const existingAccNum = await prisma.bankAccount.findUnique({
    where: {
      account_number: accNum,
    },
  });
  if (existingAccNum) {
    throw new CustomAPIError("Account Number already exist", 400);
  }

  const result = await prisma.bankAccount.update({
    where: {
      id: Number(id),
    },
    data: {
      account_holder: data.account_holder,
      bank_name: data.bank_name,
      account_number: data.account_number,
    },
  });
};

const destroyBankAccount = async (params) => {
  const { id } = params;

  if (!id) {
    throw new CustomAPIError("Id not found!", 404);
  }

  await prisma.bankAccount.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  fetchBankAccount,
  postBankAccount,
  putBankAccount,
  destroyBankAccount,
};
