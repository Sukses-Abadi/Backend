const {
  fetchAllProducts,
  fetchProductByQueryAndPriceFilter,
  fetchSingleProductBySlugOrId,
} = require("../services/product.service");
const CustomAPIError = require("../middlewares/custom-error");

const getAllProducts = async (req, res) => {
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

const getSingleProduct = async (req, res) => {
  const { slug } = req.params;
  const product = await fetchSingleProductBySlugOrId(slug);
  if (!product) {
    throw new CustomAPIError("error fetching product", 404);
  }
  return res.json({
    status: "success",
    message: "Product is fetched successfully",
    data: product,
  });
};

const getProductByQueryAndPriceFilter = async (req, res) => {
  console.log(req.query);
  const product = await fetchProductByQueryAndPriceFilter(req.query);

  return res.json({
    status: "success",
    message: "Product is queried successfully",
    data: product,
  });
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  getProductByQueryAndPriceFilter,
};
