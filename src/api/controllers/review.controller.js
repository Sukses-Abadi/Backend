const { CustomAPIError } = require("../middlewares/custom-error");
const { StatusCodes } = require("http-status-codes");
const { validateInteger, validateString } = require("../../lib/validateInput");
const {
  createReview,
  getAllReviewsForProduct,
  updateReviewForProduct,
  deleteReviewForProduct,
} = require("../services/review.service");

// Controller function to create a new review for a product
const createReviewForProduct = async (req, res) => {
  // Assuming you have product_id in req.params and other data in req.body
  const { review_text, rating, image } = req.body;
  const { product_id } = req.params;

  // You can access the user information from req.user after using the verifyTokenUser middleware
  const user = req.user;

  // Use the user's ID from req.user to create the review
  const review = await createReview(
    product_id,
    user.id,
    review_text,
    rating,
    image
  );

  // Send a custom success message in the response
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Review created successfully", data: review });
};

// Controller function to get all reviews for a product
const getAllReviewsForProductController = async (req, res, next) => {
  const reviews = await getAllReviewsForProduct(req.query);
  res
    .status(StatusCodes.OK)
    .json({
      status: "success",
      message: "Review Fetch successfully",
      data: reviews,
    });
};

// Controller function to update a review for a product
const updateReviewForProductController = async (req, res) => {
  const { id } = req.params;
  const { review_text, rating, image } = req.body;
  const payload = {
    id: +id,
    review_text: review_text,
    rating: +rating,
    image: image,
  };

  validateString(review_text, "Please provide a valid input");

  const updatedReview = await updateReviewForProduct(payload);
  res
    .status(StatusCodes.OK)
    .json({ message: "Update Review successfully", data: updatedReview });
};

// Controller function to delete a review for a product
const deleteReviewForProductController = async (req, res, next) => {
  const { id } = req.params;
  const data = await deleteReviewForProduct(id);
  res
    .status(StatusCodes.OK)
    .json({ message: "Deleted Review Successfully", data: data });
};

module.exports = {
  createReviewForProduct,
  getAllReviewsForProduct: getAllReviewsForProductController,
  updateReviewForProduct: updateReviewForProductController,
  deleteReviewForProduct: deleteReviewForProductController,
};
