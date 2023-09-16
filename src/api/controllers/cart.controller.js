const { addToCart, fetchCart } = require("../services/cart.service");

const showCart = async (req, res) => {
  console.log(req.user);
  const userCart = await fetchCart(+req.user.id);
  return res.json({
    status: "success",
    message: "item added successfully",
    data: userCart,
  });
};
const updateCart = async (req, res) => {
  const params = {
    product_details_id: +req.body.product_details_id,
    user_id: +req.user.id,
    quantity: req.body.quantity || 1,
  };
  const cart = await addToCart(params);
  return res.json({
    status: "success",
    message: "item added successfully",
    data: cart,
  });
};

module.exports = { showCart, updateCart };
