const CustomAPIError = require("../middlewares/custom-error");
const {
  makeOrderFromCart,
  fetchAllOrder,
  deleteOrderById,
  updatePaymentReceiptInOrder,
  updateOrderStatusAndTrackingNumber,
  fetchOrderByUserId,
  fetchOrderbyId,
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
    throw new CustomAPIError(`${error.message}`, 400);
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

const deleteOrder = async (req, res) => {
  try {
    const result = await deleteOrderById(+req.params.id);
    res.json({
      status: "success",
      message: "Order created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`${error.message}`, 400);
  }
};

const uploadReceipt = async (req, res) => {
  try {
    const result = await updatePaymentReceiptInOrder();
    res.json({
      status: "success",
      message: "Order created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`${error.message}`, 400);
  }
};
const updateStatusAndTracking = async (req, res) => {
  const payload = {
    id: +req.params.id,
    tracking_number: req.body.tracking_number,
    status: req.body.status,
  };
  try {
    const result = await updateOrderStatusAndTrackingNumber(payload);
    res.json({
      status: "success",
      message: "Order updated successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`${error.message}`, 400);
  }
};

const getAllOrdersByUserId = async (req, res) => {
  try {
    const result = await fetchOrderByUserId(req.user.id);
    res.json({
      status: "success",
      message: "Orders are fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`${error.message}`, 400);
  }
};

const getOrderbyId = async (req, res) => {
  try {
    const result = await fetchOrderbyId(+req.params.id);
    res.json({
      status: "success",
      message: "Orders are fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`${error.message}`, 400);
  }
};
module.exports = {
  createOrder,
  getAllOrders,
  deleteOrder,
  uploadReceipt,
  updateStatusAndTracking,
  getAllOrdersByUserId,
  getOrderbyId,
};