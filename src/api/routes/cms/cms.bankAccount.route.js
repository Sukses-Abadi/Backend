const {
  getAllBankAccount,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
} = require("../../controllers/cms/cms.bankAccount.controller");
const { verifyTokenAdmin } = require("../../middlewares/verifyTokenMiddleware");

const router = require("express").Router();

router.use(verifyTokenAdmin);
router.get("/", getAllBankAccount);
router.post("/", createBankAccount);
router.put("/:id", updateBankAccount);
router.delete("/:id", deleteBankAccount);

module.exports = router;
