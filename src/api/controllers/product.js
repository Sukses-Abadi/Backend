const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// CRUD APIs for Product
const createProduct = async (req, res) => {
  const {
    name,
    SKU,
    description,
    slug,
    keyword,
    category_id,
    sub_category_id,
  } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        name,
        SKU,
        description,
        slug,
        keyword,
        category_id,
        sub_category_id,
      },
    });
    return res.json({
      status: "success",
      message: "All products are presented",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
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
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    return res.json({
      status: "success",
      message: "Product is created successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const {
    name,
    SKU,
    description,
    slug,
    keyword,
    category_id,
    sub_category_id,
    discount,
  } = req.body;
  const dataToUpdate = {};
  if (name) {
    dataToUpdate.name = name;
  }
  if (SKU) {
    dataToUpdate.SKU = SKU;
  }
  if (description) {
    dataToUpdate.description = description;
  }
  if (slug) {
    dataToUpdate.slug = slug;
  }
  if (keyword) {
    dataToUpdate.keyword = keyword;
  }
  if (category_id) {
    dataToUpdate.category_id = category_id;
  }
  if (discount) {
    dataToUpdate.discount = discount;
  }
  if (sub_category_id) {
    dataToUpdate.sub_category_id = sub_category_id;
  }
  console.log(dataToUpdate);
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: dataToUpdate,
    });
    return res.json({
      status: "success",
      message: "Product is updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    return res.json({
      status: "success",
      message: "Product is delete successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  updateProduct,
  createProduct,
  deleteProduct,
};
