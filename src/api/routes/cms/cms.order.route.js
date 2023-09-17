const {
  getAllOrders,
  deleteOrder,
  updateStatusAndTracking,
  getOrderbyId,
} = require("../../controllers/order.controller");

const router = require("express").Router();

router.get("/", getAllOrders);
router.get("/:id", getOrderbyId);
router.delete("/:id", deleteOrder);
router.put("/:id", updateStatusAndTracking);

module.exports = router;
