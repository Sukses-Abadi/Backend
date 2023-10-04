const prisma = require("../../lib/prisma");
const {
  deleteProduct,
  getAllProductsCMS,
  getSingleProductCMS,
  createProduct,
  updateProduct,
} = require("../controllers/cms/cms.product.controller");
const {
  getSingleProduct,
  getProductByQueryAndPriceFilter,
  getBestSeller,
} = require("../controllers/product.controller");

const router = require("express").Router();

router.get("/", getProductByQueryAndPriceFilter);
router.get("/best-seller", getBestSeller);
router.get("/:slug", getSingleProduct);

module.exports = router;
