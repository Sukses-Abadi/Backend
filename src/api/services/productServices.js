const prisma = require("../../lib/prisma");
const slugify = require("../../lib/slugify");
const CustomAPIError = require("../middlewares/custom-error");

const fetchAllProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const fetchSingleProduct = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id: +id },
    include: {
      productDetails: true,
    },
  });
  // console.log(product);
  if (!product) {
    throw new CustomAPIError(`no product with id of ${id}`, 400);
  }
  return product;
};
const postFullProduct = async (data) => {
  let {
    name,
    SKU,
    description,
    slug,
    keyword,
    category_id,
    sub_category_id,
    product_galleries,
    product_details,
  } = data;
  console.log(data);

  slug = slugify(name + SKU);
  console.log(slug);
  const product = await prisma.product.create({
    data: {
      name,
      SKU,
      description,
      slug,
      keyword,
      category_id,
      sub_category_id,
      productGalleries: { create: product_galleries },
      productDetails: { create: product_details },
    },
  });
  // console.log(product);
  if (!product) {
    throw new CustomAPIError(`no product with id of ${id}`, 400);
  }
  return product;
};

const putUpdateProduct = async (id, data) => {
  console.log(id, data);
  const product = await prisma.product.findUnique({ where: { id: +id } });
  const updatedProduct = await prisma.product.update({
    where: { id: +id },
    data: {
      name: product.name || data.name,
      SKU: product.SKU || data.SKU,
      description: product.description || data.description,
      keyword: product.keyword || data.keyword,
      discount: product.discount || data.discount,
      category_id: product.category_id || data.category_id,
      sub_category_id: product.sub_category_id || data.sub_category_id,
      // productGalleries: {updateMany : {where :{product_id: id}},data:{ photos: p} },
      // productDetails: { update: product_details },
    },
  });
  console.log("product is updated");
  const product_galleries = await prisma.productGallery.findMany({
    where: { product_id: +id },
  });
  const updateProductGallery = await prisma.productGallery.updateMany({
    where: { product_id: +id },
    data: {},
  });
  console.log(product_galleries);
  console.log(updateProductGallery);
};

module.exports = {
  fetchAllProducts,
  fetchSingleProduct,
  postFullProduct,
  putUpdateProduct,
};
