const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { successResponse } = require("../../lib/response");

const getBankAccount = async (req, res, next) => {
  try {
    const result = await prisma.bankAccount.findMany();
    res.json(
      successResponse({
        message: "Get Bank Account success",
        data: result,
      })
    );
  } catch (error) {
    next(error);
  }
};

const createBankAccount = async (req, res, next) => {
  try {
    const data = req.body;
    const getId = await prisma.admin.findMany();
    const adminId = getId[0].id;

    const existingAccNumber = await prisma.bankAccount.findUnique({
      where: {
        account_number: data.account_number,
      },
    });
    if (existingAccNumber) {
      return res.status(400).json({ message: "Account number already exist!" });
    }

    const result = await prisma.bankAccount.create({
      data: {
        account_holder: data.account_holder,
        bank_name: data.bank_name,
        account_number: data.account_number,
        admin_id: adminId,
      },
    });

    res.status(201).json(
      successResponse({
        message: "Bank Account is created",
        data: result,
      })
    );
  } catch (error) {
    next(error);
  }
};

const updateBankAccount = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const accNum = data.account_number;
    const existingAccNum = await prisma.bankAccount.findUnique({
      where: {
        account_number: accNum,
      },
    });
    if (existingAccNum) {
      return res.status(400).json({ message: "Account Number already exist" });
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

    return res.status(200).json(
      successResponse({
        message: "Bank Account is updated",
        data: result,
      })
    );
  } catch (error) {
    next(error);
  }
};

const deleteBankAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "Id not found!" });
    }
    await prisma.bankAccount.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(
      successResponse({
        message: "Bank Account is deleted",
      })
    );
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getBankAccount,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
};
