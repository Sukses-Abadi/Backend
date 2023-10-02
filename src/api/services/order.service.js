const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");
const { resetCartToDefault } = require("./cart.service");
const makeOrderFromCart = async (params) => {
  let {
    id,
    address_id,
    shipping_method,
    shipping_cost,
    bank_account_id,
    courier,
    product_order_attributes,
    total_weight,
    total_price,
    total_payment,
  } = params;
  // console.log(params);
  if (product_order_attributes.length === 0) {
    throw new CustomAPIError("No product is provided", 400);
  }
  try {
    const order = await prisma.order.create({
      data: {
        user: { connect: { id } },
        shipping_cost: shipping_cost,
        total_price: total_price,
        total_payment: total_payment,
        total_weight: total_weight,
        shipping_method: shipping_method,
        order_date: new Date(),
        address: { connect: { id: address_id } },
        bankAccount: { connect: { id: bank_account_id } },
        courier: courier,
        status: "waiting",
      },
      include: { orderProducts: true },
    });

    await Promise.all(
      product_order_attributes.map(async (productOrder) => {
        const { product_details_id, price, quantity } = productOrder;

        await prisma.orderProduct.create({
          data: {
            product_details_id,
            order_id: order.id,
            quantity,
            price,
          },
        });

        const prev = await prisma.productDetails.findUnique({
          where: { id: product_details_id },
        });

        if (!prev || prev.stock < quantity) {
          throw new CustomAPIError(
            `Insufficient stock for product ${product_details_id}`,
            400
          );
        }

        await prisma.productDetails.update({
          where: { id: product_details_id },
          data: { stock: prev.stock - quantity },
        });
      })
    );

    // Update order totals
    resetCartToDefault(id);
    // Reset cart to default
    return await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        user: true,
        orderProducts: {
          include: {
            ProductDetails: {
              include: { product: { include: { productGalleries: true } } },
            },
          },
        },
        bankAccount: true,
        address: true,
      },
    });
  } catch (error) {
    throw new CustomAPIError(`Error: ${error.message}`, 400);
  }
};

const fetchAllOrder = async ({
  id,
  startTime,
  endTime,
  status,
  page,
  limit,
  sortBy,
  sortOrder,
  q,
}) => {
  const filterObject = {};
  if (id) {
    filterObject.id = +id;
  }
  if (startTime && endTime) {
    filterObject.order_date = {
      gte: new Date(startTime),
      lte: new Date(endTime),
    };
  }

  if (status) {
    filterObject.status = status;
  }

  const pageNumber = Number(page) || 1;
  const take = Number(limit) || 2;
  const totalItems = await prisma.order.count({
    where: q
      ? {
          OR: [{ id: +q }, {}],
        }
      : filterObject,
  });
  const totalPages = Math.ceil(totalItems / take);

  const filterSortBy = sortBy || "order_date";
  const filterSortOrder = sortOrder || "asc";

  const orders = await prisma.order.findMany({
    where: q
      ? {
          OR: [{ id: +q }, {}],
        }
      : filterObject,
    include: {
      orderProducts: {
        include: {
          ProductDetails: {
            include: { product: { include: { productGalleries: true } } },
          },
        },
      },
      user: true,
      bankAccount: true,
      address: { include: { city: true } },
    },
    orderBy: {
      [filterSortBy]: filterSortOrder, // Dynamic sorting based on the query parameters
    },
    skip: (pageNumber - 1) * take,
    take: take,
  });
  if (!totalPages) {
    return {
      orders,
      prevPage: pageNumber - 1 === 0 ? null : pageNumber - 1,
      currentPage: pageNumber,
      nextPage: null,
      limit: take,
      totalItems,
      totalPages,
    };
  }
  return {
    orders,
    prevPage: pageNumber > 1 ? pageNumber - 1 : null,
    currentPage: pageNumber,
    nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
    totalItems,
    limit: take,
    totalPages,
  };
};

const updatePaymentReceiptInOrder = async (payload) => {
  const { order_id, payment_receipt, status, review } = payload;
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: order_id },
      data: {
        payment_receipt: payment_receipt,
        status: status,
        review: review || false,
      },
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

const fetchOrderByUserId = async (
  userId,
  { status, page, limit, sortBy, sortOrder }
) => {
  const filterObject = {};
  if (status) {
    filterObject.status = status;
  }

  const pageNumber = Number(page) || 1;
  const take = Number(limit) || 50;

  const totalItems = await prisma.order.count({
    where: { user_id: +userId, ...filterObject },
  });

  const totalPages = Math.ceil(totalItems / take); // Use 'take' instead of 'limit'

  const filterSortBy = sortBy || "order_date";
  const filterSortOrder = sortOrder || "asc";

  const orders = await prisma.order.findMany({
    where: {
      user_id: +userId,
      ...filterObject, // Spread the filterObject here
    },
    include: {
      orderProducts: {
        include: {
          ProductDetails: {
            include: { product: { include: { productGalleries: true } } },
          },
        },
      },
      user: true,
      bankAccount: true,
      address: { include: { city: true } },
    },
    orderBy: {
      [filterSortBy]: filterSortOrder,
    },
    skip: (pageNumber - 1) * take,
    take: take,
  });

  return {
    orders,
    prevPage: pageNumber - 1 > 0 ? pageNumber - 1 : null,
    currentPage: pageNumber,
    nextPage: pageNumber + 1 <= totalPages ? pageNumber + 1 : null,
    totalItems,
    limit: take, // Use 'take' instead of 'limit'
    totalPages,
  };
};

const fetchOrderbyId = async (order_id) => {
  const order = await prisma.order.findUnique({
    where: {
      id: +order_id,
    },
    include: {
      orderProducts: {
        include: {
          ProductDetails: {
            include: { product: { include: { productGalleries: true } } },
          },
        },
      },
      bankAccount: true,
      user: true,
      address: { include: { city: true } },
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
