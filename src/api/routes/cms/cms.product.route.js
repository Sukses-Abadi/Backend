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

router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);
router.post("/", upload.array("product_galleries", 5), createProduct);
router.get("/", getProductByQueryAndPriceFilter);
router.get("/:id", getSingleProductCMS);
module.exports = router;
