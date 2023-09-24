const router = require("express").Router();

const crudProduct = require("./api/routes/product.route");
const userRoute = require("./api/routes/user.route");
const reviewRoute = require("./api/routes/review.route");
const crudCity = require("./api/routes/city.route");
const adminRoute = require("./api/routes/cms/cms.admin.route");
const crudCategoryCMS = require("./api/routes/cms/cms.categories.route");
const crudSubCategoryCMS = require("./api/routes/cms/cms.subcategories.route");
const crudProductCMS = require("./api/routes/cms/cms.product.route");
const crudUserCMS = require("./api/routes/cms/cms.user.route");
const crudCart = require("./api/routes/cart.route");
const uploadFile = require("./lib/upload");
const upload = require("./lib/multer");
const crudAddress = require("./api/routes/address.route");
const crudBank = require("./api/routes/bankAccount.route");
const crudBankCMS = require("./api/routes/cms/cms.bankAccount.route");
const crudOrder = require("./api/routes/order.route");
const crudOrderCMS = require("./api/routes/cms/cms.order.route");
const getAllCategory = require("./api/routes/category.route");
const getAllSubCategory = require("./api/routes/subCategory.route");
const getProductDetailsBasedOnSize = require("./api/routes/productDetails.routes");
const {
  verifyTokenAdmin,
} = require("../src/api/middlewares/verifyTokenMiddleware");
const rajaOngkir = require("./api/routes/rajaongkir.route");
const crudCartProduct = require("./api/routes/cartProduct.route");
/**
 * api routes
 */
router.post("/api/uploads", upload.array("files", 5), uploadFile);
router.use("/api/rajaongkir", rajaOngkir);
router.use("/api/cms", adminRoute);
router.use("/api/products", crudProduct);
router.use("/api/user", userRoute);
router.use("/api/cart", crudCart);
router.use("/api/address", crudAddress);
router.use("/api/city", crudCity);
router.use("/api/bank-accounts", crudBank);
router.use("/api/review", reviewRoute);
router.use("/api/order", crudOrder);
router.use("/api/category", getAllCategory);
router.use("/api/subcategory", getAllSubCategory);
router.use("/api/product_details", getProductDetailsBasedOnSize);
router.use("/api/cartproduct", crudCartProduct);

router.use(verifyTokenAdmin);
router.use("/api/cms/bank-accounts", crudBankCMS);
router.use("/api/cms/category", crudCategoryCMS);
router.use("/api/cms/subcategory", crudSubCategoryCMS);
router.use("/api/cms/products", crudProductCMS);
router.use("/api/cms/users", crudUserCMS);
router.use("/api/cms/order", crudOrderCMS);

module.exports = router;
