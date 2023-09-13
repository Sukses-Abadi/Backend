const router = require("express").Router();

const helloRoute = require("./api/routes/hello.route");
const crudProduct = require("./api/routes/product.route");
/**
 * api routes
 */
router.use("/api/hello", helloRoute);
router.use("/api", crudProduct);

module.exports = router;
