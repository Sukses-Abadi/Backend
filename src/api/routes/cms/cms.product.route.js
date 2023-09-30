const upload = require("../../../lib/multer");
const uploadFile = require("../../../lib/upload");
const {
  deleteProduct,
  getSingleProductCMS,
  createProduct,
  updateProduct,
  deleteProductDetail,
  deleteProductImage,
  createProductDetail,
  createProductImage,
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

// crud product details
router.post("/:id/details", createProductDetail);
router.delete("/details/:id", deleteProductDetail);

// crud product galleries
router.post("/:id/galleries", createProductImage);
router.delete("/galleries/:id", deleteProductImage);

module.exports = router;
