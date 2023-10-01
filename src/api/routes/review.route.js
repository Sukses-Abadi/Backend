const {
  createReviewForProduct,
  getAllReviewsForProduct,
  getReviewByIdWithUser,
  updateReviewForProduct,
  deleteReviewForProduct,
} = require("../controllers/review.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");
const router = require("express").Router();

// Apply the verifyTokenUser middleware to relevant routes
router.post("/product/:product_id", verifyTokenUser, createReviewForProduct);
router.get("/:product_id", getAllReviewsForProduct);
router.get("/", verifyTokenUser, getReviewByIdWithUser);
router.put("/:id", verifyTokenUser, updateReviewForProduct);
router.delete("/:id", verifyTokenUser, deleteReviewForProduct);

module.exports = router;
