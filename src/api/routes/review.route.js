
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
router.post("/:product_id/review", verifyTokenUser, createReviewForProduct);
router.get("/:product_id/review", getAllReviewsForProduct);
router.get("/:product_id/review/:id", getReviewByIdWithUser);
router.put("/:product_id/review/:id", verifyTokenUser,updateReviewForProduct);
router.delete("/:product_id/review/:id",verifyTokenUser, deleteReviewForProduct);

module.exports = router;
