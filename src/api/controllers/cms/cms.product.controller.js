const CustomAPIError = require("../../middlewares/custom-error");
const {
  fetchAllProducts,

  postFullProduct,
  putUpdateProduct,
  deleteFullProduct,
  fetchSingleProductBySlugOrId,
  deleteOneProductDetail,
  deleteOneProductImage,
  postProductDetail,
  postProductImage,
  deleteOneProductReview,
} = require("../../services/product.service");

const getAllProductsCMS = async (req, res) => {
  try {
    const products = await fetchAllProducts();
    return res.json({
      status: "success",
      message: "All products are presented",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSingleProductCMS = async (req, res) => {
  const { id } = req.params;
  const product = await fetchSingleProductBySlugOrId(id);
  return res.json({
    status: "success",
    message: `product with id ${id} fetched`,
    data: product,
  });
};

const createProduct = async (req, res) => {
  const product = await postFullProduct(req.body);
  return res.json({
    status: "success",
    message: "product is created successfully",
    data: product,
  });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await putUpdateProduct(id, req.body);
  return res.json({
    status: "success",
    message: "product is updated successfully",
    data: product,
  });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await deleteFullProduct(id);
  return res.json({
    status: "success",
    message: "product is deleted successfully",
    data: deletedProduct,
  });
};

// crud product details
const createProductDetail = async (req, res) => {
  const { id } = req.params;
  const productDetail = await postProductDetail(id, req.body);
  return res.json({
    status: "success",
    message: "product detail is created successfully",
    data: productDetail,
  });
};

const deleteProductDetail = async (req, res) => {
  const { id } = req.params;
  const deletedProductDetail = await deleteOneProductDetail(id);
  return res.json({
    status: "success",
    message: "product detail is deleted successfully",
    data: deletedProductDetail,
  });
};

// crud product galleries
const createProductImage = async (req, res) => {
  const { id } = req.params;
  const productImage = await postProductImage(id, req.body);
  return res.json({
    status: "success",
    message: "product image is created successfully",
    data: productImage,
  });
};

const deleteProductImage = async (req, res) => {
  const { id } = req.params;
  const deletedProductImage = await deleteOneProductImage(id);
  return res.json({
    status: "success",
    message: "product image is deleted successfully",
    data: deletedProductImage,
  });
};

// crud product reviews
const deleteProductReview = async (req, res) => {
  const { id } = req.params;
  const deletedProductReview = await deleteOneProductReview(id);
  return res.json({
    status: "success",
    message: "product review is deleted successfully",
    data: deletedProductReview,
  });
};

module.exports = {
  getAllProductsCMS,
  getSingleProductCMS,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductDetail,
  deleteProductDetail,
  createProductImage,
  deleteProductImage,
  deleteProductReview,
};
