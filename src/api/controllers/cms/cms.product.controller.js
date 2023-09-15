const CustomAPIError = require("../../middlewares/custom-error");
const {
  fetchAllProducts,
  fetchSingleProduct,
  postFullProduct,
  putUpdateProduct,
  deleteFullProduct,
} = require("../../services/product.services");

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
  // try {
  const product = await fetchSingleProduct(id);
  if (!product) {
    throw new CustomAPIError("Couldn't get product", 404);
  }
  return res.json({
    status: "success",
    message: `product with id ${id} fetched`,
    data: product,
  });
  // } catch (error) {}
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
module.exports = {
  getAllProductsCMS,
  getSingleProductCMS,
  createProduct,
  updateProduct,
  deleteProduct,
};
