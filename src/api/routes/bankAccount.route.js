const { getAllBankAccount } = require("../controllers/bankAccount.controller");

const router = require("express").Router();

router.get("/", getAllBankAccount);

module.exports = router;
