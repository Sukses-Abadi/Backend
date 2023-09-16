const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const makeOrderFromCart = async (params) => {
  const { id, username } = params;

  const resetCartToDefault = async (userId) => {
    try {
      await prisma.$transaction([
        prisma.cart.update({
          where: {
            user_id: userId,
          },
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
            CartProduct: true, // Include CartProduct relation
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
      const userCart = await prisma.cart.findUnique({
        where: { user_id: userId },
        include: {
          user: true,
          address: true,
          bankAccount: true,
          CartProduct: true,
        },
      });
      return userCart;
    } catch (error) {
      throw new Error(`Unable to reset cart: ${error.message}`);
    }
  };

  try {
    const cart = await prisma.cart.findUnique({
      where: { user_id: id },
      include: { CartProduct: true },
    });
    if (!cart) {
      return new CustomAPIError(`No product is submitted`, 400);
    }
    if (cart.CartProduct.length <= 0) {
      throw new CustomAPIError(`No product is submitted`, 400);
    }

    const order = await prisma.order.create({
      data: {
        user_id: cart.user_id,
        shipping_cost: cart.shipping_cost,
        total_price: cart.total_price,
        total_payment: cart.total_payment,
        total_weight: cart.total_weight,
        shipping_method: cart.shipping_method,
        order_date: new Date(),
        address_id: cart.address_id,
        bank_account_id: cart.bank_account_id,
        courier: cart.courier,
        status: "waiting", // Set initial status
      },
      include: { orderProducts: true },
    });

    cart.CartProduct.map(async (product) => {
      await prisma.orderProduct.create({
        data: {
          product_details_id: product.product_details_id,
          order_id: order.id,
          quantity: product.quantity,
          price: product.price,
        },
      });
      const prev = await prisma.productDetails.findUnique({
        where: { id: product.product_details_id },
      });

      await prisma.productDetails.update({
        where: { id: product.product_details_id },
        data: { stock: prev.stock - product.quantity },
      });
    });
    // Optionally, you can update cart properties here (e.g., clear cart after successful order)
    resetCartToDefault(id);
    const updatedOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: { orderProducts: true },
    });
    return updatedOrder;
  } catch (error) {
    throw new CustomAPIError(`Error : ${error.message}`, 400);
  }
};

const fetchAllOrder = async () => {
  const orders = await prisma.order.findMany({
    include: { orderProducts: true },
  });
  return orders;
};
module.exports = { makeOrderFromCart, fetchAllOrder };
