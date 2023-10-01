const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");
const { StatusCodes } = require("http-status-codes");

// Function to add a review for a product
const createReview = async (
  product_id,
  user_id,
  review_text,
  rating,
  image
) => {
  if (review_text.length === 0 || review_text === undefined) {
    throw new CustomAPIError("Please provide a valid review text");
  }
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
      `User has already reviewed the product ${product_id}`,
      StatusCodes.BAD_REQUEST
    );
  }
};

// Function to get all reviews for a product including user data
const getAllReviewsForProduct = async (product_id, query) => {
  try {
    const productId = parseInt(product_id, 10); // Assuming base 10
    const { limit = 10, page = 1 } = query;

    const pageNumber = Number(page) || 1;
    const take = Number(limit) || 50;
    const skip = (Number(pageNumber) - 1) * take;
    console.log(productId);
    const reviews = await prisma.review.findMany({
      where: {
        product_id: productId, // Use the converted integer
      },
      include: {
        user: true, // Include user data
      },
      take,
      skip,
    });

    const totalItems = await prisma.review.count({
      where: {
        product_id: productId,
      },
    });

    const totalPages = Math.ceil(totalItems / take);
    const prevPage = pageNumber > 1 ? pageNumber - 1 : null;
    const nextPage = pageNumber < totalPages ? pageNumber + 1 : null;

    return {
      reviews,
      currentPage: pageNumber,
      prevPage,
      nextPage,
      totalPages,
      totalItems,
    };
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

    const review = await prisma.review.findMany({
      where: {
        user_id: reviewId,
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
const updateReviewForProduct = async (payload) => {
  const { id, review_text, rating, image } = payload;
  try {
    const review = await prisma.review.update({
      where: {
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
      400
    );
  }
};

// Function to delete a review for a product
const deleteReviewForProduct = async (id) => {
  try {
    await prisma.review.delete({
      where: {
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
