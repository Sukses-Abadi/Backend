const {
  fetchCart,
  deleteCartProduct,
  updateUserCart,
  deleteAllCartProduct,
  resetCartToDefault,
} = require("../services/cart.service");

const showCart = async (req, res) => {
  // console.log(req.user);
  const userCart = await fetchCart(+req.user.id);
  return res.json({
    status: "success",
    message: "item added successfully",
    data: userCart,
  });
};
const updateCart = async (req, res) => {
  const params = {
    product_details_id: +req.body.product_details?.id,
    user_id: +req.user?.id,
    quantity: +req.body.product_details?.quantity || 1,
    address_id: req.body.address_id,
    shipping_cost: req.body.shipping_cost,
    bank_account_id: req.body.bank_account_id,
    courier: req.body.courier || JNE,
    shipping_method: req.body.shipping_method,
  };
  const cart = await updateUserCart(params);
  return res.json({
    status: "success",
    message: "item added successfully",
    data: cart,
  });
};

const deleteItem = async (req, res) => {
  const payload = {
    cart_product_id: +req.body.cart_product_id,
    id: +req.user.id,
  };
  const item = await deleteCartProduct(payload);
  return res.json({
    status: "success",
    message: "item deleted successfully",
    data: item,
  });
};

const resetCart = async (req, res) => {
  const item = await resetCartToDefault(+req.user.id);
  return res.json({
    status: "success",
    message: "item deleted successfully",
    data: item,
  });
};
module.exports = { showCart, updateCart, deleteItem, resetCart };