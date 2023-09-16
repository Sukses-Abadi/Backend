const {
  updateCart,
  showCart,
  deleteItem,
  resetCart,
} = require("../controllers/cart.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");

const router = require("express").Router();

router.put("/", verifyTokenUser, updateCart);
router.get("/", verifyTokenUser, showCart);
router.delete("/", verifyTokenUser, deleteItem);
router.post("/", verifyTokenUser, resetCart);
module.exports = router;
