const router = require("express").Router();

const crudProduct = require("./api/routes/product.route");
/**
 * api routes
 */

router.use("/api", crudProduct);

module.exports = router;
