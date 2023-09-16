const {
  makeOrderFromCart,
  fetchAllOrder,
} = require("../services/order.service");

const createOrder = async (req, res) => {
  try {
    const result = await makeOrderFromCart(req.user);
    res.json({
      status: "success",
      message: "Order created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllOrders = async (req, res) => {
  const result = await fetchAllOrder();
  res.json({
    status: "success",
    message: "Order fetched successfully",
    data: result,
  });
};

module.exports = { createOrder, getAllOrders };
