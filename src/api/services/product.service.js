const prisma = require("../../lib/prisma");
const slugify = require("../../lib/slugify");
const CustomAPIError = require("../middlewares/custom-error");

const fetchAllProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const fetchSingleProductBySlug = async (slug) => {
  const product = await prisma.product.findUnique({
    where: { slug: slug },
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

  const existingProduct = await prisma.product.findFirst({
    where: {
      OR: [
        { name: { equals: name, mode: "insensitive" } },
        { SKU: { equals: SKU, mode: "insensitive" } },
      ],
    },
  });
  console.log(existingProduct);
  if (existingProduct) {
    throw new CustomAPIError(`The product duplicate on name or SKU`, 400);
  }
  slug = slugify(name);
  // console.log(slug);
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
    include: {
      productGalleries: true,
      productDetails: true,
    },
  });
  // console.log(product);
  if (!product) {
    throw new CustomAPIError(`Product creation is failed`, 400);
  }
  return product;
};

const putUpdateProduct = async (id, data) => {
  // console.log(id, data);
  const product = await prisma.product.findUnique({
    where: { id: +id },
    include: { productGalleries: true, productDetails: true },
  });

  if (!product) {
    throw new CustomAPIError(`no product with id of ${id}`, 400);
  }

  let productGalleriesToUpdate;
  if (data.product_galleries && Array.isArray(data.product_galleries)) {
    productGalleriesToUpdate = data.product_galleries;
  } else {
    productGalleriesToUpdate = product.productGalleries;
  }

  let detailsToUpdate;
  if (data.product_details && Array.isArray(data.product_details)) {
    detailsToUpdate = data.product_details;
  } else {
    detailsToUpdate = product.productDetails;
  }

  // console.log(productGalleriesToUpdate);
  await prisma.product.update({
    where: { id: +id },
    data: {
      name: data.name || product.name,
      SKU: data.SKU || product.SKU,
      description: data.description || product.description,
      slug: slugify(data.name || product.name),
      keyword: data.keyword || product.keyword,
      discount: data.discount || product.discount,
      category_id: data.category_id || product.category_id,
      sub_category_id: data.sub_category_id || product.sub_category_id,
      productGalleries: {
        updateMany: productGalleriesToUpdate.map((gallery) => ({
          where: { id: gallery.id },
          data: { photo: gallery.photo },
        })),
      },
      productDetails: {
        updateMany: detailsToUpdate.map((detail) => ({
          where: { id: detail.id },
          data: {
            color: detail.color,
            size: detail.size,
            stock: detail.stock,
            price: detail.price,
          },
        })),
      },
    },
  });
  const updateProduct = await prisma.product.findUnique({
    where: { id: +id },
    include: { productGalleries: true, productDetails: true },
  });
  return updateProduct;
};

const deleteFullProduct = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id: +id },
    include: { productGalleries: true, productDetails: true },
  });

  if (!product) {
    throw new CustomAPIError(`No product with id of ${id}`, 400);
  }

  const galleryIdsToDelete = product.productGalleries.map(
    (gallery) => gallery.id
  );
  const detailIdsToDelete = product.productDetails.map((detail) => detail.id);
  await prisma.productGallery.deleteMany({
    where: { product_id: +id },
  });

  // Delete ProductDetails first
  await prisma.productDetails.deleteMany({
    where: { product_id: +id },
  });

  // Delete Product
  await prisma.product.delete({
    where: { id: +id },
    include: {
      productGalleries: true,
      productDetails: true,
    },
  });

  return {
    deletedProduct: product,
    deletedGalleries: galleryIdsToDelete,
    deletedDetails: detailIdsToDelete,
  };
};

/**
 * Fetches products based on a query and price filter.
 * @param {Object} query - An object containing properties like id, name, SKU, maxp, minp, page, and skip.
 * @returns {Array} - An array of products fetched from the database based on the provided query and price filter.
 */
const fetchProductByQueryAndPriceFilter = async (query) => {
  const {
    id,
    name,
    SKU,
    maxPrice,
    minPrice,
    skip,
    page,
    sub_category_id,
    category_id,
  } = query;

  const queryObject = {
    id: id ? Number(id) : undefined,
    SKU,
    name: name ? { contains: name, mode: "insensitive" } : undefined,

    sub_category_id: sub_category_id ? Number(sub_category_id) : undefined,
    category_id: category_id ? Number(category_id) : undefined,
  };

  const pageNumber = Number(page) || 1;
  const limit = Number(skip) || 2;
  const offset = (pageNumber - 1) * limit;

  const products = await prisma.product.findMany({
    skip: offset,
    take: limit,
    where: queryObject,
    include: {
      productGalleries: true,
      productDetails: {
        where: {
          price: {
            gte: +minPrice || 0,
            lte: +maxPrice || 99999999,
          },
        },
      },
    },
  });

  const filteredProducts = products.filter(
    (product) => product.productDetails.length > 0
  );
  const response = {
    products: filteredProducts.length > 0 ? filteredProducts : null,
    page: pageNumber,
    limit: limit,
  };
  return response;
};

module.exports = {
  fetchAllProducts,
  fetchSingleProductBySlug,
  postFullProduct,
  putUpdateProduct,
  deleteFullProduct,
  fetchProductByQueryAndPriceFilter,
};
