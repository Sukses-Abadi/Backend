const router = require("express").Router();

const crudProduct = require("./api/routes/product.route");
const userRoute = require("./api/routes/user.route");
const reviewRoute = require("./api/routes/review.route"); 

const crudCity = require("./api/routes/city.route");


const adminRoute = require("./api/routes/cms/cms.admin.route");
const crudCategory = require("./api/routes/cms/cms.categories.route");
const crudSubCategory = require("./api/routes/cms/cms.subcategories.route");
const crudProductCMS = require("./api/routes/cms/cms.product.route");
const crudUserCMS = require("./api/routes/cms/cms.user.route");
const crudCart = require("./api/routes/cart.route");
const uploadFile = require("./lib/upload");
const upload = require("./lib/multer");
const crudAddress = require("./api/routes/address.route");
const crudBank = require("./api/routes/bankAccount.route");
const crudBankCMS = require("./api/routes/cms/cms.bankAccount.route");
<<<<<<< HEAD
const crudOrder = require("./api/routes/order.routes");
const crudOrderCMS = require("./api/routes/cms/cms.order.route");
=======
const {
  verifyTokenAdmin,
} = require("../src/api/middlewares/verifyTokenMiddleware");

>>>>>>> development
/**
 * api routes
 */
router.post("/api/uploads", upload.array("file", 5), uploadFile);

router.use("/api/cms", adminRoute);
router.use("/api/products", crudProduct);
router.use("/api/user", userRoute);
router.use("/api/cart", crudCart);
router.use("/api/address", crudAddress);
router.use("/api/city", crudCity);
router.use("/api/bank-accounts", crudBank);
router.use("/api/products", reviewRoute);

<<<<<<< HEAD
router.use("/api/order", crudOrder);
router.use("/api/cms/bank-accounts", crudBankCMS);
=======
router.use(verifyTokenAdmin);
>>>>>>> development
router.use("/api/cms/category", crudCategory);
router.use("/api/cms/subcategory", crudSubCategory);
router.use("/api/cms/products", crudProductCMS);
router.use("/api/cms/users", crudUserCMS);
<<<<<<< HEAD
router.use("/api/cms/order", crudOrderCMS);
=======
router.use("/api/cms/bank-accounts", crudBankCMS);

>>>>>>> development
module.exports = router;
