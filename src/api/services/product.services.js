const prisma = require("../../lib/prisma");
const slugify = require("../../lib/slugify");
const CustomAPIError = require("../middlewares/custom-error");

const fetchAllProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const fetchSingleProductById = async (id) => {
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

  slug = slugify(name);
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

  console.log(productGalleriesToUpdate);
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

  // Extract gallery and detail IDs
  const galleryIdsToDelete = product.productGalleries.map(
    (gallery) => gallery.id
  );
  const detailIdsToDelete = product.productDetails.map((detail) => detail.id);

  await prisma.product.delete({
    where: { id: +id },
    include: {
      productGalleries: true, // Include deleted galleries in the response
      productDetails: true, // Include deleted details in the response
    },
  });

  return {
    deletedProduct: product,
    deletedGalleries: galleryIdsToDelete,
    deletedDetails: detailIdsToDelete,
  };
};

const fetchProductByQueryAndPriceFilter = async (query) => {
  // console.log(query);
  const { id, name, SKU, maxp, minp } = query;
  const product = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: name?.toLowerCase() } },
        { SKU: SKU?.toLowerCase() },
      ],
    },
    include: {
      productGalleries: true,
      productDetails: {
        where: {
          price: {
            gte: +minp || 0, // Greater than or equal to minPrice (default to 0 if not provided)
            lte: +maxp || 99999999, // Less than or equal to maxPrice (default to a high value if not provided)
          },
        },
      },
    },
  });

  if (!product) {
    throw new CustomAPIError(`No product found with query: ${query}`, 404);
  }

  return product;
};

module.exports = {
  fetchAllProducts,
  fetchSingleProductById,
  postFullProduct,
  putUpdateProduct,
  deleteFullProduct,
  fetchProductByQueryAndPriceFilter,
};
