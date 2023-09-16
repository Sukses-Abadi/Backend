const {
  createOrder,
  getAllOrders,
} = require("../controllers/order.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");

const router = require("express").Router();

router.post("/", verifyTokenUser, createOrder);
router.get("/", getAllOrders);

module.exports = router;
