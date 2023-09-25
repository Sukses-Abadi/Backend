const {
  createOrder,
  deleteOrder,
  getAllOrdersByUserId,
  getOrderbyId,
  updateStatusAndTracking,
  uploadReceipt,
} = require("../controllers/order.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");

const router = require("express").Router();
router.get("/:id", verifyTokenUser, getOrderbyId);
router.get("/", verifyTokenUser, getAllOrdersByUserId);
router.post("/", verifyTokenUser, createOrder);
router.delete("/", verifyTokenUser, deleteOrder);
router.put("/", verifyTokenUser, uploadReceipt); // frontend  { status: "complete" }
module.exports = router;
