const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const fetchCart = async (user_id) => {
  return prisma.cart.findUnique({
    where: { user_id: user_id },
    include: { CartProduct: true },
  });
};

const updateCartData = async (user_id, payload, tx) => {
  const cart = await tx.cart.findUnique({
    where: { user_id: user_id },
  });

  const {
    address_id = cart.address_id,
    shipping_cost = cart.shipping_cost,
    bank_account_id = cart.bank_account_id,
    courier = cart.courier,
    shipping_method = cart.shipping_method,
  } = payload;

  return tx.cart.update({
    where: { id: cart.id },
    data: {
      user_id,
      address_id,
      shipping_cost,
      total_weight: cart.total_weight,
      total_price: cart.total_price,
      courier,
      bank_account_id,
      shipping_method,
    },
  });
};

const checkStock = async (productDetailsId, quantity, tx) => {
  const productDetails = await tx.productDetails.findUnique({
    where: { id: productDetailsId },
  });

  if (!productDetails) {
    throw new CustomAPIError("Product details not found", 404);
  }

  if (productDetails.stock < quantity) {
    throw new CustomAPIError("Insufficient stock", 400);
  }

  return productDetails;
};

const updateTotalPayment = async (userId, tx) => {
  const cart = await tx.cart.findUnique({
    where: { user_id: userId },
  });

  if (!cart) {
    throw new CustomAPIError(`Cart not found for user with ID ${userId}`);
  }

  const totalPayment = (cart.total_price || 0) + (cart.shipping_cost || 0);

  return tx.cart.update({
    where: { user_id: userId },
    data: { total_payment: totalPayment },
  });
};
const updateCartDetails = async (user_id, tx) => {
  const cart = await tx.cart.findUnique({
    where: { user_id },
    include: {
      CartProduct: {
        include: {
          ProductDetails: {
            include: { product: true },
          },
        },
      },
    },
  });

  if (!cart) {
    throw new CustomAPIError(`Cart not found for user with ID ${user_id}`);
  }

  let total_price = 0;
  let total_weight = 0;

  for (const cartProduct of cart.CartProduct) {
    const productDetails = cartProduct.ProductDetails;
    if (productDetails && productDetails.product) {
      total_price += productDetails.price * cartProduct.quantity;
      total_weight += productDetails.product.weight * cartProduct.quantity;
    }
  }

  const totalPayment = (total_price || 0) + (cart.shipping_cost || 0);

  return tx.cart.update({
    where: { user_id },
    data: {
      total_price,
      total_weight,
      total_payment: totalPayment,
    },
  });
};

const addItemToCart = async (product_details_id, user_id, quantity, tx) => {
  let userCart = await tx.cart.findUnique({
    where: {
      user_id,
    },
  });
  const product = await tx.productDetails.findUnique({
    where: {
      id: product_details_id,
    },
  });
  if (!userCart) {
    const newCart = await tx.cart.create({
      data: {
        user_id,
      },
    });
    userCart = newCart;
  }
  if (quantity !== 0) {
    let existingCartItem = await tx.cartProduct.findFirst({
      where: {
        product_details_id,
        cart_id: userCart.id,
      },
    });

    if (existingCartItem) {
      const updatedCartItem = await tx.cartProduct.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity,
        },
      });
      if (updatedCartItem.quantity === 0) {
        await tx.cartProduct.delete({
          where: {
            id: existingCartItem.id,
          },
        });
      }
    } else {
      await tx.cartProduct.create({
        data: {
          product_details_id: product.id,
          cart_id: userCart.id,
          quantity,
          price: product.price,
        },
      });
    }
  }

  await updateCartDetails(user_id, tx);

  return prisma.cart.findUnique({
    where: { user_id: user_id },
    include: {
      CartProduct: true,
    },
  });
};

const updateUserCart = async (params) => {
  const {
    product_details_id,
    user_id,
    quantity,
    address_id,
    shipping_cost,
    bank_account_id,
    courier,
    shipping_method,
  } = params;

  try {
    const result = await prisma.$transaction(async (tx) => {
      if (quantity < 1) {
        throw new CustomAPIError("Quantity must be greater than 0 ", 400);
      }

      if (product_details_id && quantity) {
        await addItemToCart(product_details_id, user_id, quantity, tx);
      }

      if (
        address_id ||
        shipping_cost ||
        bank_account_id ||
        courier ||
        shipping_method
      ) {
        await updateCartData(
          user_id,
          {
            address_id,
            shipping_cost,
            bank_account_id,
            courier,
            shipping_method,
          },
          tx
        );
      }

      const updatedResult = await updateTotalPayment(user_id, tx);
      return updatedResult;
    });

    return result;
  } catch (error) {
    console.error(`Error updating user cart: ${error.message}`);
    throw new CustomAPIError(error.message, 500);
  }
};

const deleteCartProduct = async (params) => {
  try {
    const { orderCart_id } = params;
    await prisma.cartProduct.delete({
      where: {
        id: orderCart_id,
      },
    });
  } catch (error) {
    throw new CustomAPIError(error.message, 500);
  }

  return prisma.cart.findUnique({
    where: { user_id: params.id },
    include: {
      CartProduct: true,
    },
  });
};

const resetCartToDefault = async (userId) => {
  await prisma.$transaction([
    prisma.cart.update({
      where: { user_id: userId },
      data: {
        shipping_cost: null,
        total_payment: 0,
        total_weight: 0,
        total_price: 0,
        courier: null,
        address_id: null,
        bank_account_id: null,
      },
      include: {
        user: true,
        address: true,
        bankAccount: true,
        CartProduct: true,
      },
    }),
    prisma.cartProduct.deleteMany({
      where: {
        cart: {
          user_id: userId,
        },
      },
    }),
  ]);

  return prisma.cart.findUnique({
    where: { user_id: userId },
    include: {
      user: true,
      address: true,
      bankAccount: true,
      CartProduct: true,
    },
  });
};

module.exports = {
  updateUserCart,
  fetchCart,
  deleteCartProduct,
  resetCartToDefault,
};
