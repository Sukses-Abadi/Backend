const {
  createOrder,
  deleteOrder,
  getAllOrdersByUserId,
  getOrderbyId,
  updateStatusAndTracking,
} = require("../controllers/order.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");

const router = require("express").Router();
router.get("/:id", verifyTokenUser, getOrderbyId);
router.get("/", verifyTokenUser, getAllOrdersByUserId);
router.post("/", verifyTokenUser, createOrder);
router.delete("/", verifyTokenUser, deleteOrder);
router.put("/:id", verifyTokenUser, updateStatusAndTracking); // frontend  { status: "complete" }
module.exports = router;
