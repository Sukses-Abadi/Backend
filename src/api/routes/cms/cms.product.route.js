const upload = require("../../../lib/multer");
const uploadFile = require("../../../lib/upload");
const {
  deleteProduct,
  getSingleProductCMS,
  createProduct,
  updateProduct,
} = require("../../controllers/cms/cms.product.controller");
const {
  getProductByQueryAndPriceFilter,
} = require("../../controllers/product.controller");

const router = require("express").Router();

router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);
router.post("/products", upload.array("product_galleries", 5), createProduct);
router.get("/products", getProductByQueryAndPriceFilter);
router.get("/products/:id", getSingleProductCMS);
module.exports = router;
