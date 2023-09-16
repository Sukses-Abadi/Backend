const router = require("express").Router();

const adminRoute = require("./api/routes/cms/cms.admin.route");
const bankAccountRoute = require("./api/routes/bankAccount.route");
const bankAccountCmsRoute = require("./api/routes/cms/cms.bankAccount.route");

const crudCity = require("./api/routes/city.route");

const crudProduct = require("./api/routes/product.route");
const userRoute = require("./api/routes/user.route");
const crudCategory = require("./api/routes/cms/cms.categories.route");
const crudSubCategory = require("./api/routes/cms/cms.subcategories.route");
const crudProductCMS = require("./api/routes/cms/cms.product.route");
const crudUserCMS = require("./api/routes/cms/cms.user.route");
const uploadFile = require("./lib/upload");
const upload = require("./lib/multer");
const {
  verifyTokenAdmin,
} = require("../src/api/middlewares/verifyTokenMiddleware");

/**
 * api routes
 */
router.post("/api/uploads", upload.array("file", 5), uploadFile);

router.use("/api/cms", adminRoute);
router.use("/api/bank-accounts", bankAccountRoute);
router.use("/api/products", crudProduct);
router.use("/api/user", userRoute);
router.use("/api/city", crudCity);

router.use(verifyTokenAdmin);
// router.use("/api", crudSubCategory);
router.use("/api/cms/category", crudCategory);
router.use("/api/cms/subcategory", crudSubCategory); //BELUM DICEK
router.use("/api/cms/products", crudProductCMS); //BELUM DICEK
router.use("/api/cms/users", crudUserCMS);
router.use("/api/cms/bank-accounts", bankAccountCmsRoute);

module.exports = router;
