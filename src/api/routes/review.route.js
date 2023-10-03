const {
  createReviewForProduct,
  getAllReviewsForProduct,
  updateReviewForProduct,
  deleteReviewForProduct,
} = require("../controllers/review.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");
const router = require("express").Router();

// Apply the verifyTokenUser middleware to relevant routes
router.post("/product/:product_id", verifyTokenUser, createReviewForProduct);
router.get("/", getAllReviewsForProduct);
router.put("/:id", verifyTokenUser, updateReviewForProduct);
router.delete("/:id", verifyTokenUser, deleteReviewForProduct);

module.exports = router;
