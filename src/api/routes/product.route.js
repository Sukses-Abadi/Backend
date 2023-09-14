const {
  getAllProductsCMS,
  getSingleProductCMS,
  createProduct,
  updateProduct,
} = require("../controllers/cms.product");
const {
  getAllProducts,
  getSingleProduct,

  deleteProduct,
} = require("../controllers/product");

const router = require("express").Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getSingleProduct);
// router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

router.put("/cms/products/:id", updateProduct);
router.post("/cms/products", createProduct);
router.get("/cms/products", getAllProductsCMS);
router.get("/cms/products/:id", getSingleProductCMS);
module.exports = router;
