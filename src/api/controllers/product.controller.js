const { PrismaClient } = require("@prisma/client");
const {
  fetchAllProducts,
  fetchSingleProduct,
  fetchProductByQueryAndPriceFilter,
  fetchSingleProductById,
} = require("../services/product.services");
const CustomAPIError = require("../middlewares/custom-error");

const prisma = new PrismaClient();

// CRUD APIs for Product
// const createProduct = async (req, res) => {
//   const {
//     name,
//     SKU,
//     description,
//     slug,
//     keyword,
//     category_id,
//     sub_category_id,
//   } = req.body;
//   try {
//     const product = await prisma.product.create({
//       data: {
//         name,
//         SKU,
//         description,
//         slug,
//         keyword,
//         category_id,
//         sub_category_id,
//       },
//     });
//     return res.json({
//       status: "success",
//       message: "All products are presented",
//       data: product,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

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
  const { id } = req.params;

  const product = await fetchSingleProductById(id);
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
