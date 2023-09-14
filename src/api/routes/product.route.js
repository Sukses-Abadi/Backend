const {
  deleteProduct,
  getAllProductsCMS,
  getSingleProductCMS,
  createProduct,
  updateProduct,
} = require("../controllers/cms.product.controller");
const {
  getAllProducts,
  getSingleProduct,
  getProductByQueryAndPriceFilter,
} = require("../controllers/product.controller");

const router = require("express").Router();

router.get("/products", getAllProducts);
router.get("/products/search", getProductByQueryAndPriceFilter);
router.get("/products/:id", getSingleProduct);

router.delete("/cms/products/:id", deleteProduct);
router.put("/cms/products/:id", updateProduct);
router.post("/cms/products", createProduct);
router.get("/cms/products", getAllProductsCMS);
router.get("/cms/products/:id", getSingleProductCMS);
router.get("/cms/products/search", getProductByQueryAndPriceFilter);
module.exports = router;
