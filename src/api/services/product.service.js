const prisma = require("../../lib/prisma");
const slugify = require("../../lib/slugify");
const CustomAPIError = require("../middlewares/custom-error");

const fetchAllProducts = async () => {
  const products = await prisma.product.findMany({
    include: { productGalleries: true, productDetails: true, reviews: true },
  });

  return products;
};

const fetchSingleProductBySlugOrId = async (data) => {
  let product;

  // Check if the input is numeric, assuming it's an ID
  if (!isNaN(data)) {
    product = await prisma.product.findUnique({
      where: {
        id: +data, // Convert data to a number
      },
      include: {
        productDetails: true,
        reviews: true,
      },
    });
  } else {
    // It's not numeric, so treat it as a slug
    product = await prisma.product.findUnique({
      where: {
        slug: data,
      },
      include: {
        productDetails: true,
        productGalleries: true,
      },
    });
  }

  if (!product) {
    throw new CustomAPIError(`No product found with slug or id: ${data}`, 400);
  }

  return product;
};
const postFullProduct = async (data) => {
  try {
    let {
      name,
      SKU,
      description,
      slug,
      weight = weight || 100,
      keyword,
      category_id,
      sub_category_id,
      product_galleries,
      product_details,
      discount = discount || null,
    } = data;

    slug = slugify(name);

    const product = await prisma.product.create({
      data: {
        name,
        SKU,
        description,
        slug,
        keyword,
        discount,
        weight,
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

    if (!product) {
      throw new CustomAPIError(`Product creation is failed`, 400);
    }
    return product;
  } catch (error) {
    throw new CustomAPIError(`${error.name} `, 400);
  }
};

const putUpdateProduct = async (id, data) => {
  const product = await prisma.product.findUnique({
    where: { id: +id },
    include: { productGalleries: true, productDetails: true },
  });

  if (!product) {
    throw new CustomAPIError(`No product with id of ${id}`, 400);
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
    limit = 2,
    page = 1,
    sub_category_id,
    category_id,
    rating,
    q,
    sortBy,
    sortOrder,
  } = query;

  const pageNumber = Number(page);
  const take = Number(limit);
  const filterSortBy = sortBy || "created_at";
  const filterSortOrder = sortOrder || "desc";

  const queryObject = {
    id: id && Number(id),
    SKU,
    name: name && { contains: name, mode: "insensitive" },
    sub_category_id: sub_category_id && Number(sub_category_id),
    category_id: category_id && Number(category_id),
  };

  const totalItems = await prisma.product.count({
    where: q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { SKU: q },
            { keyword: { contains: q, mode: "insensitive" } },
          ],
        }
      : queryObject,
    orderBy: {
      [filterSortBy]: filterSortOrder, // Dynamic sorting based on the query parameters
    },
  });

  const totalPages = Math.ceil(totalItems / limit) || 1;

  const products = await prisma.product.findMany({
    skip: (pageNumber - 1) * take,
    take,
    where: q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { SKU: q },
            { keyword: { contains: q, mode: "insensitive" } },
          ],
        }
      : queryObject,
    include: {
      Category: true,
      SubCategory: true,
      productGalleries: true,
      reviews: rating
        ? {
            where: { rating: +rating },
          }
        : true,
      productDetails: {
        where: {
          price: {
            gte: +minPrice || 0,
            lte: +maxPrice || 99999999,
          },
        },
      },
    },
    orderBy: {
      [filterSortBy]: filterSortOrder, // Dynamic sorting based on the query parameters
    },
  });

  const filteredProducts = products.filter(
    (product) => product.productDetails.length > 0
  );

  if (rating) {
    filteredProducts.forEach((product) => {
      const totalRating = product.reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      product.averageRating = totalRating / product.reviews.length;
    });
  }

  const filteredByRating = rating
    ? filteredProducts.filter((product) => product.averageRating >= +rating)
    : filteredProducts;

  const response = {
    products: filteredByRating.length > 0 ? filteredByRating : null,
    prevPage: pageNumber > 1 ? pageNumber - 1 : null,
    currentPage: pageNumber,
    nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
    totalItems,
    limit: take,
    totalPages,
  };

  return response;
};

module.exports = {
  fetchAllProducts,
  fetchSingleProductBySlugOrId,
  postFullProduct,
  putUpdateProduct,
  deleteFullProduct,
  fetchProductByQueryAndPriceFilter,
};
