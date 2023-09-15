const { getAllBankAccount } = require("../controllers/bankAccount.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");

const router = require("express").Router();

router.use(verifyTokenUser);
router.get("/", getAllBankAccount);

module.exports = router;
