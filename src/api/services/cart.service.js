const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const fetchCart = async (user_id) => {
  try {
    const userCart = await prisma.cart.findUnique({
      where: { user_id: user_id },
      include: { CartProduct: true },
    });
    return userCart;
  } catch (error) {
    throw new CustomAPIError(
      `Error fetching user's cart: ${error.message}`,
      400
    );
  }
};

const addToCart = async (params) => {
  const { product_details_id, user_id, quantity } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: user_id },
      include: { cart: true },
    });
    console.log(user);
    // Check if the product exists
    const product_details = await prisma.productDetails.findUnique({
      where: { id: product_details_id },
      include: { product: true },
    });
    console.log(product_details);
    if (!product_details) {
      throw new CustomAPIErrorError("Product not found");
    }

    // Create a new item in the cart
    const newCartItem = await prisma.cartProduct.create({
      data: {
        product_details_id: product_details_id, // Assuming you want to add the first product detail
        cart_id: user.cart.user_id, // get the data from user.cart
        quantity,
        price: product_details.price * quantity, // Calculate the total price based on quantity
      },
    });

    // Update the total_price in the cart
    const cartProducts = await prisma.cartProduct.findMany({
      where: { cart_id: user_id },
      include: {
        ProductDetails: true,
      },
    });

    const total_price = cartProducts.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

    await prisma.cart.update({
      where: { user_id: user_id },
      data: { total_price },
    });

    return newCartItem;
  } catch (error) {
    throw new CustomAPIError(
      `Error adding product to cart: ${error.message}`,
      400
    );
  }
};
module.exports = { addToCart, fetchCart };
