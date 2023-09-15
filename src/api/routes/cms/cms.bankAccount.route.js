const {
  getBankAccount,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
} = require("../../controllers/cms/cms.bankAccount.controller");

const router = require("express").Router();

router.get("/cms/bank-account", getBankAccount);
router.post("/cms/bank-account", createBankAccount);
router.put("/cms/bank-account/:id", updateBankAccount);
router.delete("/cms/bank-account/:id", deleteBankAccount);

module.exports = router;
