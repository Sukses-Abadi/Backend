const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");
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
        const { id: product_details_id, price, quantity } = productOrder;

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
    const updatedOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        user: true,
        address: true,
        orderProducts: true,
      },
    });

    // Reset cart to default
    await prisma.cart.update({
      where: { user_id: id },
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
    });
    return updatedOrder;
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
    where: filterObject,
  });
  const totalPages = Math.ceil(totalItems / limit);
  const filterSortBy = sortBy || "order_date";
  const filterSortOrder = sortOrder || "asc";

  const orders = await prisma.order.findMany({
    where: filterObject,
    include: { orderProducts: true },
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
    prevPage: pageNumber - 1 === 0 ? null : pageNumber - 1,
    currentPage: pageNumber,
    nextPage: nextPage || +pageNumber + 1 > totalPages ? null : pageNumber + 1,
    limit: take,
    totalItems,
    totalPages,
  };
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

const fetchOrderByUserId = async (
  userId,
  { status, page, limit, sortBy, sortOrder }
) => {
  const filterObject = {};
  if (status) {
    filterObject.status = status;
  }
  const pageNumber = Number(page) || 1;
  const take = Number(limit) || 2;
  const totalItems = await prisma.order.count({
    where: { OR: [{ user_id: userId }, { filterObject }] },
  });
  const totalPages = Math.ceil(totalItems / limit);
  const filterSortBy = sortBy || "order_date";
  const filterSortOrder = sortOrder || "asc";

  const orders = await prisma.order.findMany({
    where: {
      user_id: +userId,
    },
    include: {
      orderProducts: true,
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
      totalItems,
      limit,
    };
  }
  return {
    orders,
    prevPage: pageNumber - 1 === 0 ? null : pageNumber - 1,
    currentPage: pageNumber,
    nextPage: +pageNumber + 1 > totalPages ? null : pageNumber + 1,
    totalItems,
    limit,
  };
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
