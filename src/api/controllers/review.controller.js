const { CustomAPIError } = require("../middlewares/custom-error");
const { StatusCodes } = require("http-status-codes");
const { validateInteger, validateString } = require("../../lib/validateInput");
const {
  createReview,
  getAllReviewsForProduct,
  getReviewByIdWithUser,
  updateReviewForProduct,
  deleteReviewForProduct,
} = require("../services/review.service");

// Controller function to create a new review for a product
const createReviewForProduct = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error in createReviewForProduct:", error); // Add this line to log the error
    throw new CustomAPIError("Invalid input data", StatusCodes.BAD_REQUEST);
  }
};

// Controller function to get all reviews for a product
const getAllReviewsForProductController = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const reviews = await getAllReviewsForProduct(product_id);
    res
      .status(StatusCodes.OK)
      .json({ message: "Review Fetch successfully", reviews });
  } catch (error) {
    console.log(error);
    throw new CustomAPIError("Invalid input data", StatusCodes.BAD_REQUEST);
  }
};

// Controller function to get a single review by ID including user data
const getReviewByIdWithUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await getReviewByIdWithUser(id);
    res
      .status(StatusCodes.OK)
      .json({ message: "Review Fetch by ID successfully", review });
  } catch (error) {
    console.log(error);
    throw new CustomAPIError("Invalid input data", StatusCodes.BAD_REQUEST);
  }
};

// Controller function to update a review for a product
const updateReviewForProductController = async (req, res) => {
  try {
    const { product_id, id } = req.params;
    const { review_text, rating, image } = req.body;

    // Validate the input data using your custom validation functions
    if (!validateString(review_text) || !validateInteger(rating)) {
      throw new CustomAPIError("Invalid input data", StatusCodes.BAD_REQUEST);
    }

    const updatedReview = await updateReviewForProduct(
      product_id,
      id,
      review_text,
      rating,
      image
    );
    res
      .status(StatusCodes.OK)
      .json({ message: "Update Review successfully", data: updatedReview });
  } catch (error) {
    console.log(error);
    throw new CustomAPIError("Invalid input data", StatusCodes.BAD_REQUEST);
  }
};

// Controller function to delete a review for a product
const deleteReviewForProductController = async (req, res, next) => {
  try {
    const { product_id, id } = req.params;
    const data = await deleteReviewForProduct(product_id, id);
    res
      .status(StatusCodes.OK)
      .json({ message: "Deleted Review Successfully", data: data });
  } catch (error) {
    console.log(error);
    throw new CustomAPIError("Invalid input data", StatusCodes.BAD_REQUEST);
  }
};

module.exports = {
  createReviewForProduct,
  getAllReviewsForProduct: getAllReviewsForProductController,
  getReviewByIdWithUser: getReviewByIdWithUserController,
  updateReviewForProduct: updateReviewForProductController,
  deleteReviewForProduct: deleteReviewForProductController,
};
