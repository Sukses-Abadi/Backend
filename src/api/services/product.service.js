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
        Category: true,
        SubCategory: true,

        productGalleries: {
          orderBy: {
            id: "asc",
          },
        },
        reviews: { include: { user: true } },
        productDetails: {
          orderBy: {
            id: "asc",
          },
        },
      },
    });
  } else {
    // It's not numeric, so treat it as a slug
    product = await prisma.product.findUnique({
      where: {
        slug: data,
      },
      include: {
        Category: true,
        SubCategory: true,
        productGalleries: true,
        reviews: { include: { user: true } },
        productDetails: true,
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

    if (product_details.length <= 0) {
      throw new CustomAPIError(`please provide a product details`, 400);
    }
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
    throw new CustomAPIError(
      `Error: ${error.message} `,
      error.statusCode || 500
    );
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
      discount: data.discount,
      weight: data.weight || product.weight,
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
          where: { id: detail?.id },
          data: {
            color: detail?.color,
            size: detail?.size,
            stock: detail?.stock,
            price: detail?.price,
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
  let {
    id,
    name,
    SKU,
    maxPrice,
    minPrice,
    restockStatus,
    discountStatus,
    limit = 2,
    page = 1,
    sub_category_id,
    category_id,
    rating,
    averageRating,
    q,
    sortBy,
    sortOrder,
  } = query;

  category_id = category_id?.split(",").map(Number);
  sub_category_id = sub_category_id?.split(",").map(Number);
  averageRating = averageRating?.split(",").map(Number);

  const pageNumber = Number(page);
  const take = Number(limit);
  const filterSortBy = sortBy || "created_at";
  const filterSortOrder = sortOrder || "desc";

  // get product ids from reviews based on average review rating
  let filteredProductIds;

  if (averageRating) {
    const groupReviews = await prisma.review.groupBy({
      by: "product_id",
      having: {
        OR: averageRating.map((rating) => ({
          rating: {
            _avg: {
              gte: rating,
              lt: rating + 1,
            },
          },
        })),
      },
    });

    filteredProductIds = groupReviews.map((obj) => obj.product_id);
  }

  const queryObject = {
    id: filteredProductIds ? { in: filteredProductIds } : id && Number(id),
    SKU,
    name: name && { contains: name, mode: "insensitive" },
    discount: discountStatus
      ? JSON.parse(discountStatus)
        ? { not: { equals: null } }
        : { equals: null }
      : undefined,
    sub_category_id: sub_category_id && { in: sub_category_id },
    category_id: category_id && { in: category_id },
    productDetails: restockStatus
      ? JSON.parse(restockStatus)
        ? {
            some: {
              stock: 0,
            },
          }
        : {
            every: {
              stock: { not: 0 },
            },
          }
      : undefined,
  };

  const totalItems = await prisma.product.count({
    where: q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { SKU: { contains: q, mode: "insensitive" } },
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
            { SKU: { contains: q, mode: "insensitive" } },
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

  filteredProducts.forEach((product) => {
    const totalRating = product.reviews
      .map((review) => review.rating)
      .reduce((acc, currentRating) => acc + currentRating, 0);
    product.averageRating = totalRating
      ? totalRating / product.reviews.length
      : null;
  });

  const response = {
    products: filteredProducts.length > 0 ? filteredProducts : null,
    prevPage: pageNumber > 1 ? pageNumber - 1 : null,
    currentPage: pageNumber,
    nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
    totalItems,
    limit: take,
    totalPages,
  };

  return response;
};

// crud product details
const postProductDetail = async (productId, data) => {
  try {
    let {
      product_id = +productId,
      color,
      size,
      price = +price || 0,
      stock = +stock || 0,
    } = data;

    const productDetail = await prisma.productDetails.create({
      data: {
        product_id,
        color,
        size,
        price,
        stock,
      },
    });

    if (!productDetail) {
      throw new CustomAPIError(`Product detail creation is failed`, 400);
    }
    return productDetail;
  } catch (error) {
    throw new CustomAPIError(
      `Error: ${error.message} `,
      error.statusCode || 500
    );
  }
};

const deleteOneProductDetail = async (id) => {
  const productDetail = await prisma.productDetails.findUnique({
    where: { id: +id },
  });

  if (!productDetail) {
    throw new CustomAPIError(`No product detail with id of ${id}`, 400);
  }

  await prisma.productDetails.delete({
    where: { id: +id },
  });

  return {
    deletedProductDetail: productDetail,
  };
};

// crud product galleries
const postProductImage = async (productId, data) => {
  try {
    let { product_id = +productId, photo } = data;

    const productImage = await prisma.productGallery.create({
      data: {
        product_id,
        photo,
      },
    });

    if (!productImage) {
      throw new CustomAPIError(`Product image creation is failed`, 400);
    }
    return productImage;
  } catch (error) {
    throw new CustomAPIError(
      `Error: ${error.message} `,
      error.statusCode || 500
    );
  }
};

const deleteOneProductImage = async (id) => {
  const productImage = await prisma.productGallery.findUnique({
    where: { id: +id },
  });

  if (!productImage) {
    throw new CustomAPIError(`No product image with id of ${id}`, 400);
  }

  await prisma.productGallery.delete({
    where: { id: +id },
  });

  return {
    deletedProductImage: productImage,
  };
};

module.exports = {
  fetchAllProducts,
  fetchSingleProductBySlugOrId,
  postFullProduct,
  putUpdateProduct,
  deleteFullProduct,
  fetchProductByQueryAndPriceFilter,
  postProductDetail,
  deleteOneProductDetail,
  postProductImage,
  deleteOneProductImage,
};
