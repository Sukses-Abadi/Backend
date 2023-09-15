const { getBankAccount } = require("../controllers/bankAccount.controller");

const router = require("express").Router();

router.get("/bank-account", getBankAccount);

module.exports = router;
