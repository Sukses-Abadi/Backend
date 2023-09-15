const router = require("express").Router();

const crudProduct = require("./api/routes/product.route");
const userRoute = require("./api/routes/user.route");
const crudCategory = require("./api/routes/categories.route");
const crudSubCategory = require("./api/routes/subcategories.route");
const crudProductCMS = require("./api/routes/cms/cms.product.route");
const uploadFile = require("./lib/upload");
const upload = require("./lib/multer");
/**
 * api routes
 */
router.post("/api/uploads", upload.array("file", 5), uploadFile);
router.use("/api", crudProduct);
router.use("/api", userRoute);
router.use("/api", crudCategory);
router.use("/api", crudSubCategory);

router.use("/api/cms", crudProductCMS);
module.exports = router;
