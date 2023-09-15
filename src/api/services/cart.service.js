const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const addToCart = async (params) => {
  const { product_details_id, user_id, quantity } = params;
  console.log(product_details_id, user_id, quantity);
  const product = await prisma.productDetails.findFirst({
    where: { id: product_details_id },
    include: { product: true },
  });
  console.log(product);
  try {
    // Check if the product is already in the cart
    const existingCartItem = await prisma.cartProduct.findFirst({
      where: {
        product_id: product.product.id,
        cart: {
          user_id: user_id,
        },
      },
    });

    if (existingCartItem) {
      // Update the quantity if the product is already in the cart
      const updatedCartItem = await prisma.cartProduct.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
      });

      return updatedCartItem;
    } else {
      // Add a new item to the cart
      const newCartItem = await prisma.cartProduct.create({
        data: {
          product: { connect: { id: product.product.id } },
          cart: { connect: { user_id: user_id } },
          quantity,
          price: product.price, // Assuming the product has a price field
        },
      });

      return newCartItem;
    }
  } catch (error) {
    throw new CustomAPIError(
      `Error adding product to cart: ${error.message}`,
      400
    );
  }
};
module.exports = addToCart;
