const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const fetchBankAccount = async () => {
  try {
    const result = await prisma.bankAccount.findMany();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const postBankAccount = async (params, payload) => {
  const data = payload;
  const { id } = params;
  const getId = await prisma.admin.findMany();
  const adminId = getId[0].id;

  console.log(getId);

  const existingAccNumber = await prisma.bankAccount.findUnique({
    where: {
      account_number: data.account_number,
    },
  });

  if (existingAccNumber) {
    throw new CustomAPIError("Account number already exist!", 400);
  }

  //   const result = await prisma.bankAccount.create({
  //     data: {
  //       account_holder: data.account_holder,
  //       bank_name: data.bank_name,
  //       account_number: data.account_number,
  //       admin_id: adminId,
  //     },
  //   });

  //   return result;
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
