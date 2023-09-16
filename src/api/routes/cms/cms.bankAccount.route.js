const {
  getAllBankAccount,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
} = require("../../controllers/cms/cms.bankAccount.controller");

const router = require("express").Router();

router.get("/", getAllBankAccount);
router.post("/", createBankAccount);
router.put("/:id", updateBankAccount);
router.delete("/:id", deleteBankAccount);

module.exports = router;
