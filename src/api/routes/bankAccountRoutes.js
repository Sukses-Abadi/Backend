const {
  getBankAccount,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
} = require("../controllers/bankAccount");

const router = require("express").Router();

router.get("/bank-account", getBankAccount);
router.post("/bank-account", createBankAccount);
router.put("/bank-account/:id", updateBankAccount);
router.delete("/bank-account/:id", deleteBankAccount);

module.exports = router;
