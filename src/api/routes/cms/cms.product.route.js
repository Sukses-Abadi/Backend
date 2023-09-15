const {
  deleteProduct,

  getSingleProductCMS,
  createProduct,
  updateProduct,
} = require("../controllers/cms/cms.product.controller");
const {
  getProductByQueryAndPriceFilter,
} = require("../controllers/product.controller");

const router = require("express").Router();
router.delete("/cms/products/:id", deleteProduct);
router.put("/cms/products/:id", updateProduct);
router.post("/cms/products", createProduct);
router.get("/cms/products", getProductByQueryAndPriceFilter);
router.get("/cms/products/:id", getSingleProductCMS);
module.exports = router;
