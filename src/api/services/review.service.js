const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");
const { StatusCodes } = require("http-status-codes");

// Function to add a review for a product
const createReview = async (product_id,user_id, review_text, rating, image) => {
  try {
    const review = await prisma.review.create({
      data: {
        product_id: +product_id,
        user_id: +user_id,
        review_text,
        rating,
        image,
      },
    });
    return review;
  } catch (error) {
    throw new CustomAPIError(
      `[createReview] Failed to create Review for Product: ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};



// Function to get all reviews for a product including user data
const getAllReviewsForProduct = async (product_id) => {
  try {
    // Convert product_id to an integer
    const productId = parseInt(product_id, 10); // Assuming base 10

    const reviews = await prisma.review.findMany({
      where: {
        product_id: productId, // Use the converted integer
      },
      include: {
        user: true, // Include user data
      },
    });
    return reviews;
  } catch (error) {
    throw new CustomAPIError(
      `[getAllReviewsForProduct] Failed to fetch Reviews for Product: ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Function to get a single review by ID including user data
const getReviewByIdWithUser = async (id) => {
  try {
    // Convert the id to an integer
    const reviewId = parseInt(id, 10);

    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
      include: {
        user: true,
      },
    });

    return review;
  } catch (error) {
    throw new CustomAPIError(
      `[getReviewByIdWithUser] Failed to fetch Review by ID: ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Function to update a review for a product
const updateReviewForProduct = async (product_id,id, review_text, rating, image) => {
  try {
    const review = await prisma.review.update({
      where: {
        product_id: +product_id,
        id: +id,
      },
      data: {
        review_text,
        rating,
        image,
      },
    });
    return review;
  } catch (error) {
    throw new CustomAPIError(
      `[updateReviewForProduct] Failed to update Review for Product: ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Function to delete a review for a product
const deleteReviewForProduct = async (product_id, id) => {
  try {
    await prisma.review.deleteMany({
      where: {
        product_id: +product_id,
        id: +id,
      },
    });
  } catch (error) {
    throw new CustomAPIError(
      `[deleteReviewForProduct] Failed to delete Review for Product: ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};




module.exports = {
  createReview,
  getAllReviewsForProduct, // Export the new function
  getReviewByIdWithUser,
  updateReviewForProduct,
  deleteReviewForProduct,
};
