const router = require("express").Router();

const crudProduct = require("./api/routes/product.route");
const userRoute = require("./api/routes/user.route");
/**
 * api routes
 */

router.use("/api", crudProduct);
router.use("/api", userRoute);
module.exports = router;
