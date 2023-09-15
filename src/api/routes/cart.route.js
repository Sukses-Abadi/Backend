const { updateCart, showCart } = require("../controllers/cart.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");

const router = require("express").Router();

router.put("/", verifyTokenUser, updateCart);
router.get("/", verifyTokenUser, showCart);
module.exports = router;
