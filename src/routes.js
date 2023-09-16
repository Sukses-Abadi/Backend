const router = require("express").Router();

const crudProduct = require("./api/routes/product.route");
const userRoute = require("./api/routes/user.route");

const crudCity = require("./api/routes/city.route");
const crudAddress = require("./api/routes/address.route");

const crudCategory = require("./api/routes/cms/cms.categories.route");
const crudSubCategory = require("./api/routes/cms/cms.subcategories.route");
const crudProductCMS = require("./api/routes/cms/cms.product.route");
const crudUserCMS = require("./api/routes/cms/cms.user.route");
const uploadFile = require("./lib/upload");
const upload = require("./lib/multer");
const crudCategoryWeb = require("./api/routes/categories.route");
const crudSubCategoryWeb = require("./api/routes/subcategories.route");
const crudAddressWeb = require("./api/routes/address.route");

/**
 * api routes
 */
router.post("/api/uploads", upload.array("file", 5), uploadFile);
router.use("/api/products", crudProduct);
router.use("/api/user", userRoute);
router.use("/api/address", crudAddress);
router.use("/api/city", crudCity);
// router.use("/api", crudCategoryWeb);
// router.use("/api", crudSubCategoryWeb);
router.use("/api", crudAddressWeb);

// router.use("/api", crudSubCategory);
router.use("/api/cms/category", crudCategory);
router.use("/api/cms/subcategory", crudSubCategory);
router.use("/api/cms/products", crudProductCMS);
router.use("/api/cms/users", crudUserCMS);

module.exports = router;
