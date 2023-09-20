const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const fetchCart = async (user_id) => {
  return prisma.cart.findUnique({
    where: { user_id: user_id },
    include: { CartProduct: true },
  });
};

const cartLogic = async (payload) => {
  try {
    const {
      id,
      address_id,
      shipping_cost,
      shipping_method,
      bank_account_id,
      product_details,
      courier,
    } = payload;

    const result = await prisma.$transaction(async (tx) => {
      // Find or create a user's cart
      const userCart = await tx.cart.findUnique({
        where: { user_id: id },
      });
      if (product_details) {
        const { id: product_details_id, quantity, price } = product_details;

        // Check if there's already a CartProduct with the same product details id
        const existingCartProduct = await tx.cartProduct.findFirst({
          where: {
            product_details_id,
            cart_id: userCart.id,
          },
        });

        if (existingCartProduct) {
          // Update existing CartProduct
          await tx.cartProduct.update({
            where: { id: existingCartProduct.id },
            data: { quantity, price },
          });
        } else {
          // Create a new CartProduct
          await tx.cartProduct.create({
            data: {
              product_details_id,
              cart_id: userCart.id,
              quantity,
              price,
            },
          });
        }
      }
      // Re-fetch CartProduct records for the user's cart
      const cartProducts = await tx.cartProduct.findMany({
        where: { cart_id: userCart.id },
      });

      // Initialize variables for total_price and total_weight
      let total_price = 0;
      let total_weight = 0;

      // Calculate total_price and total_weight
      for (const cartProduct of cartProducts) {
        total_price += cartProduct.price * cartProduct.quantity;
        total_weight += cartProduct.quantity * 100; // Assuming each item has a weight of 1
      }

      // Calculate total_payment
      const total_payment = total_price + (shipping_cost || 0);

      // Update cart details
      await tx.cart.update({
        where: { user_id: id },
        data: {
          address_id,
          shipping_cost,
          shipping_method,
          bank_account_id,
          total_price,
          total_weight,
          total_payment,
          courier,
        },
      });

      // Fetch and return the updated cart
    });

    return await fetchCart(id);
  } catch (error) {
    console.error(error);
    throw new CustomAPIError(error.message, 500);
  }
};

const deleteCartProduct = async (params) => {
  try {
    const { orderCart_id } = params;
    await prisma.cartProduct.delete({
      where: {
        id: orderCart_id,
      },
    });
  } catch (error) {
    throw new CustomAPIError(error.message, 500);
  }

  return prisma.cart.findUnique({
    where: { user_id: params.id },
    include: {
      CartProduct: true,
    },
  });
};

const resetCartToDefault = async (userId) => {
  await prisma.$transaction([
    prisma.cart.update({
      where: { user_id: userId },
      data: {
        shipping_cost: null,
        total_payment: 0,
        total_weight: 0,
        total_price: 0,
        courier: null,
        address_id: null,
        bank_account_id: null,
      },
      include: {
        user: true,
        address: true,
        bankAccount: true,
        CartProduct: true,
      },
    }),
    prisma.cartProduct.deleteMany({
      where: {
        cart: {
          user_id: userId,
        },
      },
    }),
  ]);

  return prisma.cart.findUnique({
    where: { user_id: userId },
    include: {
      user: true,
      address: true,
      bankAccount: true,
      CartProduct: true,
    },
  });
};

module.exports = {
  fetchCart,
  deleteCartProduct,
  resetCartToDefault,
  cartLogic,
};
