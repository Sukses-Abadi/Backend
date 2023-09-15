const router = require("express").Router();

const adminRoute = require("./api/routes/adminRoutes");
const bankAccountRoute = require("./api/routes/bankAccountRoutes");

const crudProduct = require("./api/routes/product.route");
const userRoute = require("./api/routes/user.route");
const crudCategory = require("./api/routes/cms/cms.categories.route");
const crudSubCategory = require("./api/routes/cms/cms.subcategories.route");
const crudProductCMS = require("./api/routes/cms/cms.product.route");
const crudUserCMS = require("./api/routes/cms/cms.user.route");
const uploadFile = require("./lib/upload");
const upload = require("./lib/multer");
/**
 * api routes
 */
router.post("/api/uploads", upload.array("file", 5), uploadFile);
router.use("/api", crudProduct);
router.use("/api", userRoute);
router.use("/api", adminRoute);
router.use("/api", bankAccountRoute);

// router.use("/api", crudSubCategory);
router.use("/api/cms", crudCategory);
router.use("/api/cms", crudSubCategory);
router.use("/api/cms", crudProductCMS);
router.use("/api/cms", crudUserCMS);
module.exports = router;
