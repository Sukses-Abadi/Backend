const router = require("express").Router();

const crudProduct = require("./api/routes/product.route");
const userRoute = require("./api/routes/user.route");
const crudCategory = require("./api/routes/categories.route");
const crudSubCategory = require("./api/routes/subcategories.route");

/**
 * api routes
 */

router.use("/api", crudProduct);
router.use("/api", userRoute);
router.use("/api", crudCategory);
router.use("/api", crudSubCategory);

module.exports = router;
