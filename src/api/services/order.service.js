const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const makeOrderFromCart = async (params) => {
  const { id, username } = params;

  const resetCartToDefault = async (userId, cart) => {
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
      console.log(`Unable to reset cart: ${error.message}`);
      // Handle the error gracefully and provide a meaningful message to the user
      throw new CustomAPIError(
        "Unable to reset cart. Please try again later.",
        500
      );
    }
  };

  try {
    const cart = await prisma.cart.findUnique({
      where: { user_id: id },
      include: { CartProduct: true },
    });
    if (!cart) {
      throw new CustomAPIError(`No product is submitted`, 400);
    }
    if (cart.CartProduct.length <= 0) {
      throw new CustomAPIError(`Nothing is in the cart`, 400);
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

    await Promise.all(
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

        if (prev.stock - product.quantity < 0) {
          throw new CustomAPIError(
            `Insufficient stock for product ${product.product_details_id}`,
            400
          );
        }
        await prisma.productDetails.update({
          where: { id: product.product_details_id },
          data: { stock: prev.stock - product.quantity },
        });
      })
    );

    // Optionally, you can update cart properties here (e.g., clear cart after successful order)
    await resetCartToDefault(id, cart);
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

const updatePaymentReceiptInOrder = async (orderId, paymentReceipt) => {
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { payment_receipt: paymentReceipt },
    });

    return updatedOrder;
  } catch (error) {
    throw new CustomAPIError(
      `Error updating payment receipt in order: ${error.message}`,
      400
    );
  }
};

const updateOrderStatusAndTrackingNumber = async (payload) => {
  const { id, tracking_number, status } = payload;
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: id },
      data: {
        status: status,
        tracking_number: tracking_number,
      },
    });

    return updatedOrder;
  } catch (error) {
    throw new CustomAPIError(
      `Error updating order status and tracking number: ${error.message}`,
      400
    );
  }
};

const deleteOrderById = async (orderId) => {
  try {
    // Use Prisma to delete the order by its ID
    const deletedOrder = await prisma.order.delete({
      where: {
        id: orderId,
      },
    });

    return deletedOrder;
  } catch (error) {
    // Handle any errors, e.g., order not found
    throw new Error(`Error deleting order: ${error.message}`);
  }
};

const fetchOrderByUserId = async (userId) => {
  const orders = await prisma.order.findMany({
    where: {
      user_id: +userId,
    },
    include: {
      orderProducts: true,
    },
  });
  if (orders.length < 0) {
    throw new CustomAPIError(`No Orders found for this user`, 400);
  }
  return orders;
};
const fetchOrderbyId = async (order_id) => {
  const order = await prisma.order.findUnique({
    where: {
      id: +order_id,
    },
    include: {
      orderProducts: true,
    },
  });
  if (!order) {
    throw new CustomAPIError(`No Order found`, 400);
  }

  return order;
};
module.exports = {
  makeOrderFromCart,
  fetchAllOrder,
  updatePaymentReceiptInOrder,
  updateOrderStatusAndTrackingNumber,
  deleteOrderById,
  fetchOrderByUserId,
  fetchOrderbyId,
};
