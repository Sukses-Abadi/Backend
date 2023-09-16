const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");
let updateTotalPayment = async (userId) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (!cart) {
      throw new Error(`Cart not found for user with ID ${userId}`);
    }

    const totalPayment = (cart.total_price || 0) + (cart.shipping_cost || 0);

    const updatedCart = await prisma.cart.update({
      where: {
        user_id: userId,
      },
      data: {
        total_payment: totalPayment,
      },
    });

    return updatedCart;
  } catch (error) {
    throw new Error(`Unable to update total payment: ${error.message}`);
  }
};

const fetchCart = async (user_id) => {
  try {
    const userCart = await prisma.cart.findUnique({
      where: { user_id: user_id },
      include: { CartProduct: true },
    });
    return userCart;
  } catch (error) {
    throw new CustomAPIError(
      `Error fetching user's cart: ${error.message}`,
      400
    );
  }
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
  if (quantity < 1) {
    throw new CustomAPIError("Quantity must be greater than 0 ", 400);
  }
  const updateCart = async (user_id, payload) => {
    const cart = await prisma.cart.findUnique({
      where: { user_id: user_id },
    });

    const { address_id, shipping_cost, bank_account_id, courier } = payload;

    const updatedCart = await prisma.cart.update({
      where: { id: cart.id },
      data: {
        user_id: user_id,
        shipping_cost: shipping_cost || cart.shipping_cost,
        total_weight: cart.total_weight,
        total_price: cart.total_price,
        courier: courier || cart.courier,
        address_id: address_id || cart.address_id,
        bank_account_id: bank_account_id || cart.bank_account_id,
        shipping_method: shipping_method || cart.shipping_method,
      },
    });

    return updatedCart;
  };

  let updateCartTotalPrice = async (user_id) => {
    const cart = await prisma.cart.findUnique({
      where: {
        user_id: user_id,
      },
    });

    const cartProducts = await prisma.cartProduct.findMany({
      where: { cart_id: cart.id },
      include: {
        ProductDetails: true,
      },
    });
    console.log(cartProducts);
    const total_price = cartProducts.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    console.log(total_price);
    await prisma.cart.update({
      where: { user_id },
      data: { total_price },
    });
  };
  let updateCartTotalWeight = async (user_id) => {
    const userCart = await prisma.cart.findUnique({
      where: { user_id },
      include: {
        CartProduct: {
          include: {
            ProductDetails: {
              include: {
                product: true, // Include the associated product
              },
            },
          },
        },
      },
    });

    if (!userCart) {
      throw new CustomAPIError("Cart not found", 404);
    }

    let totalWeight = 0;

    userCart.CartProduct.forEach((cartProduct) => {
      const productDetails = cartProduct.ProductDetails;

      if (productDetails) {
        const product = productDetails.product;
        if (product) {
          totalWeight += product.weight * cartProduct.quantity;
        }
      }
    });

    await prisma.cart.update({
      where: { user_id },
      data: { total_weight: totalWeight },
    });
  };
  let checkAndUpdateStock = async (productDetailsId, quantity) => {
    try {
      const productDetails = await prisma.productDetails.findUnique({
        where: { id: productDetailsId },
      });

      if (!productDetails) {
        throw new CustomAPIError("Product details not found", 404);
      }

      if (productDetails.stock < quantity) {
        throw new CustomAPIError("Insufficient stock", 400);
      }
    } catch (error) {
      throw new CustomAPIError(
        `Error checking/updating stock: ${error.message}`,
        400
      );
    }
  };

  // If the product_details_id is already in the cart, update quantity and checkstock
  const addItemToCart = async (product_details_id, user_id, quantity) => {
    try {
      await prisma.$transaction(async (tx) => {
        // Code running in a transaction...

        const user = await prisma.user.findUnique({
          where: { id: user_id },
          include: { cart: { include: { CartProduct: true } } },
        });

        const product = await prisma.productDetails.findUnique({
          where: { id: product_details_id },
        });
        if (!product) {
          throw new CustomAPIError("Product not found", 404);
        }
        const existingCartItem = user.cart.CartProduct.find(
          (item) => item.product_details_id === product_details_id
        );

        if (existingCartItem) {
          console.log(product.price);
          const updatedCartItem = await prisma.cartProduct.update({
            where: {
              id: existingCartItem.id,
            },
            data: {
              quantity: quantity,
              price: product.price,
            },
          });

          if (updatedCartItem.quantity === 0) {
            // If quantity is zero, delete the CartProduct
            await prisma.cartProduct.delete({
              where: {
                id: existingCartItem.id,
              },
            });
          }

          await checkAndUpdateStock(product.id, quantity); //
          await updateCartTotalPrice(user_id);
          await updateCartTotalWeight(user_id);
          await updateTotalPayment(user_id);

          return updatedCartItem;
        } else {
          // If the product_details_id is not in the cart, create a new cart item
          const product_details = await prisma.productDetails.findUnique({
            where: { id: product_details_id },
            include: { product: true },
          });
          if (!product_details) {
            throw new CustomAPIError("Product details not found", 404);
          }

          const newCartItem = await prisma.cartProduct.create({
            data: {
              product_details_id,
              cart_id: user.cart.id,
              quantity,
              price: product_details.price,
            },
          });

          await updateCartTotalPrice(user_id);
          await updateCartTotalWeight(user_id);
          await updateTotalPayment(user_id);
          return newCartItem;
        }
      });
    } catch (error) {
      throw new CustomAPIError(
        `Error adding product to cart: ${error.message}`,
        400
      );
    }
  };
  product_details_id && quantity
    ? await addItemToCart(product_details_id, user_id, quantity)
    : null;

  // check params to update
  try {
    if (
      address_id ||
      shipping_cost ||
      bank_account_id ||
      courier ||
      shipping_method
    ) {
      await updateCart(user_id, {
        address_id,
        shipping_cost,
        bank_account_id,
        courier,
        shipping_method,
      });
    }
    await updateTotalPayment(user_id);
    const updatedUserCart = await prisma.cart.findUnique({
      where: { user_id: user_id },
      include: { CartProduct: true },
    });

    return updatedUserCart;
  } catch (error) {
    throw new CustomAPIError(`Error updating user cart: ${error.message}`, 400);
  }
};

const deleteCartProduct = async (params) => {
  const { cart_product_id, id } = params;
  try {
    await prisma.cartProduct.delete({
      where: {
        id: cart_product_id,
      },
    });
  } catch (error) {
    throw new CustomAPIError(
      `Error adding product to cart: ${error.message}`,
      400
    );
  }

  const updatedUserCart = await prisma.cart.findFirst({
    where: { user_id: id },
    include: {
      CartProduct: true, // Include the cartProduct field
    },
  });
  return updatedUserCart;
};

const resetCartToDefault = async (userId) => {
  try {
    await prisma.$transaction([
      prisma.cart.update({
        where: {
          user_id: userId,
        },
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
          CartProduct: true, // Include CartProduct relation
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
    const userCart = await prisma.cart.findUnique({
      where: { user_id: userId },
      include: {
        user: true,
        address: true,
        bankAccount: true,
        CartProduct: true,
      },
    });
    return userCart;
  } catch (error) {
    throw new Error(`Unable to reset cart: ${error.message}`);
  }
};

module.exports = {
  updateUserCart,
  fetchCart,
  deleteCartProduct,
  resetCartToDefault,
};
