const {
  deleteProduct,
  getAllProductsCMS,
  getSingleProductCMS,
  createProduct,
  updateProduct,
} = require("../controllers/cms/cms.product.controller");
const {
  getAllProducts,
  getSingleProduct,
  getProductByQueryAndPriceFilter,
} = require("../controllers/product.controller");

const router = require("express").Router();

router.get("/products", getProductByQueryAndPriceFilter);
router.get("/products/:slug", getSingleProduct);

module.exports = router;
