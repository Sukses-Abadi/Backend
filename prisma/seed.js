const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Create Categories
  const axios = require("axios");
  const response = await axios.get("https://api.rajaongkir.com/starter/city", {
    headers: {
      key: "c7dbdb8918f7b450e0af4ed786dc6834",
    },
  });

  const newData = response.data.rajaongkir.results;

  newData.forEach(async function (item) {
    await prisma.city.create({
      data: {
        id: +item.city_id,
        name: item.city_name,
      },
    });
  });

  const topCategory = await prisma.category.create({
    data: {
      name: "Top",
      SubCategory: {
        createMany: {
          data: [
            { name: "T-shirt Long Sleeve" },
            { name: "T-shirt Short Sleeve" },
            { name: "Sweater" },
            { name: "Shirt Long Sleeve" },
            { name: "Shirt Short Sleeve" },
          ],
        },
      },
    },
    include: {
      SubCategory: true,
    },
  });

  const bottomCategory = await prisma.category.create({
    data: {
      name: "Bottom",
      SubCategory: {
        createMany: {
          data: [{ name: "Jeans" }, { name: "Sweatpants" }, { name: "Shorts" }],
        },
      },
    },
    include: {
      SubCategory: true,
    },
  });

  const outerwearCategory = await prisma.category.create({
    data: {
      name: "Outerwear",
      SubCategory: {
        createMany: {
          data: [{ name: "Jacket" }, { name: "Hoodie" }],
        },
      },
    },
    include: {
      SubCategory: true,
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Long Sleeve T-shirt",
        SKU: "LS1001",
        description: "Comfortable long sleeve t-shirt for all occasions.",
        slug: "long-sleeve-t-shirt",
        keyword: "t-shirt, long sleeve",
        category_id: 1,
        sub_category_id: 1,
      },
      {
        name: "Short Sleeve T-shirt",
        SKU: "SS1002",
        description: "Classic short sleeve t-shirt in various colors.",
        slug: "short-sleeve-t-shirt",
        keyword: "t-shirt, short sleeve",
        category_id: 1,
        sub_category_id: 2,
      },
      {
        name: "Sweater",
        SKU: "SW1003",
        description: "Warm and stylish sweater for chilly days.",
        slug: "sweater",
        keyword: "sweater",
        category_id: 1,
        sub_category_id: 3,
      },
      {
        name: "Jeans",
        SKU: "JE1004",
        description: "Durable denim jeans for everyday wear.",
        slug: "jeans",
        keyword: "jeans",
        category_id: 2,
        sub_category_id: 6,
      },
      {
        name: "Sweatpants",
        SKU: "SP1005",
        description: "Comfortable sweatpants for lounging or exercising.",
        slug: "sweatpants",
        keyword: "sweatpants",
        category_id: 2,
        sub_category_id: 7,
      },
      {
        name: "Shorts",
        SKU: "SH1006",
        description: "Casual shorts for warm weather.",
        slug: "shorts",
        keyword: "shorts",
        category_id: 2,
        sub_category_id: 8,
      },
      {
        name: "Jacket",
        SKU: "JA1007",
        description: "Stylish jacket for all seasons.",
        slug: "jacket",
        keyword: "jacket",
        category_id: 3,
        sub_category_id: 9,
      },
      {
        name: "Hoodie",
        SKU: "HD1008",
        description: "Cozy hoodie with a front pocket.",
        slug: "hoodie",
        keyword: "hoodie",
        category_id: 3,
        sub_category_id: 10,
      },
      // Add more products as needed
    ],
  });

  await prisma.productDetails.createMany({
    data: [
      {
        product_id: 1,
        color: "black",
        size: "S",
        stock: 50,
        price: 100000,
      },
      {
        product_id: 1,
        color: "black",
        size: "M",
        stock: 50,
        price: 100000,
      },
      {
        product_id: 1,
        color: "black",
        size: "L",
        stock: 50,
        price: 100000,
      },
      {
        product_id: 1,
        color: "black",
        size: "XL",
        stock: 50,
        price: 110000,
      },
      {
        product_id: 1,
        color: "white",
        size: "S",
        stock: 50,
        price: 100000,
      },
      {
        product_id: 1,
        color: "white",
        size: "M",
        stock: 50,
        price: 100000,
      },
      {
        product_id: 1,
        color: "white",
        size: "L",
        stock: 50,
        price: 100000,
      },
      {
        product_id: 1,
        color: "white",
        size: "XL",
        stock: 50,
        price: 110000,
      },
      {
        product_id: 2,
        color: "black",
        size: "S",
        stock: 60,
        price: 90000,
      },
      {
        product_id: 2,
        color: "black",
        size: "M",
        stock: 60,
        price: 90000,
      },
      {
        product_id: 2,
        color: "black",
        size: "L",
        stock: 60,
        price: 90000,
      },
      {
        product_id: 2,
        color: "black",
        size: "XL",
        stock: 60,
        price: 95000,
      },
      {
        product_id: 2,
        color: "white",
        size: "S",
        stock: 60,
        price: 90000,
      },
      {
        product_id: 2,
        color: "white",
        size: "M",
        stock: 60,
        price: 90000,
      },
      {
        product_id: 2,
        color: "white",
        size: "L",
        stock: 60,
        price: 90000,
      },
      {
        product_id: 2,
        color: "white",
        size: "XL",
        stock: 60,
        price: 95000,
      },
      {
        product_id: 3,
        color: "black",
        size: "S",
        stock: 40,
        price: 120000,
      },
      {
        product_id: 3,
        color: "black",
        size: "M",
        stock: 40,
        price: 120000,
      },
      {
        product_id: 3,
        color: "black",
        size: "L",
        stock: 40,
        price: 120000,
      },
      {
        product_id: 3,
        color: "black",
        size: "XL",
        stock: 40,
        price: 130000,
      },
      {
        product_id: 3,
        color: "white",
        size: "S",
        stock: 40,
        price: 120000,
      },
      {
        product_id: 3,
        color: "white",
        size: "M",
        stock: 40,
        price: 120000,
      },
      {
        product_id: 3,
        color: "white",
        size: "L",
        stock: 40,
        price: 120000,
      },
      {
        product_id: 3,
        color: "white",
        size: "XL",
        stock: 40,
        price: 130000,
      },
      {
        product_id: 4,
        color: "blue",
        size: "S",
        stock: 30,
        price: 80000,
      },
      {
        product_id: 4,
        color: "blue",
        size: "M",
        stock: 30,
        price: 80000,
      },
      {
        product_id: 4,
        color: "blue",
        size: "L",
        stock: 30,
        price: 80000,
      },
      {
        product_id: 4,
        color: "blue",
        size: "XL",
        stock: 30,
        price: 85000,
      },
      {
        product_id: 4,
        color: "red",
        size: "S",
        stock: 30,
        price: 80000,
      },
      {
        product_id: 4,
        color: "red",
        size: "M",
        stock: 30,
        price: 80000,
      },
      {
        product_id: 4,
        color: "red",
        size: "L",
        stock: 30,
        price: 80000,
      },
      {
        product_id: 4,
        color: "red",
        size: "XL",
        stock: 30,
        price: 85000,
      },
      {
        product_id: 5,
        color: "black",
        size: "S",
        stock: 45,
        price: 110000,
      },
      {
        product_id: 5,
        color: "black",
        size: "M",
        stock: 45,
        price: 110000,
      },
      {
        product_id: 5,
        color: "black",
        size: "L",
        stock: 45,
        price: 110000,
      },
      {
        product_id: 5,
        color: "black",
        size: "XL",
        stock: 45,
        price: 120000,
      },
      {
        product_id: 5,
        color: "white",
        size: "S",
        stock: 45,
        price: 110000,
      },
      {
        product_id: 5,
        color: "white",
        size: "M",
        stock: 45,
        price: 110000,
      },
      {
        product_id: 5,
        color: "white",
        size: "L",
        stock: 45,
        price: 110000,
      },
      {
        product_id: 5,
        color: "white",
        size: "XL",
        stock: 45,
        price: 120000,
      },
      {
        product_id: 6,
        color: "blue",
        size: "S",
        stock: 55,
        price: 95000,
      },
      {
        product_id: 6,
        color: "blue",
        size: "M",
        stock: 55,
        price: 95000,
      },
      {
        product_id: 6,
        color: "blue",
        size: "L",
        stock: 55,
        price: 95000,
      },
      {
        product_id: 6,
        color: "blue",
        size: "XL",
        stock: 55,
        price: 100000,
      },
      {
        product_id: 6,
        color: "black",
        size: "S",
        stock: 55,
        price: 95000,
      },
      {
        product_id: 6,
        color: "black",
        size: "M",
        stock: 55,
        price: 95000,
      },
      {
        product_id: 6,
        color: "black",
        size: "L",
        stock: 55,
        price: 95000,
      },
      {
        product_id: 6,
        color: "black",
        size: "XL",
        stock: 55,
        price: 100000,
      },
      {
        product_id: 7,
        color: "red",
        size: "S",
        stock: 65,
        price: 85000,
      },
      {
        product_id: 7,
        color: "red",
        size: "M",
        stock: 65,
        price: 85000,
      },
      {
        product_id: 7,
        color: "red",
        size: "L",
        stock: 65,
        price: 85000,
      },
      {
        product_id: 7,
        color: "red",
        size: "XL",
        stock: 65,
        price: 90000,
      },
      {
        product_id: 7,
        color: "blue",
        size: "S",
        stock: 65,
        price: 85000,
      },
      {
        product_id: 7,
        color: "blue",
        size: "M",
        stock: 65,
        price: 85000,
      },
      {
        product_id: 7,
        color: "blue",
        size: "L",
        stock: 65,
        price: 85000,
      },
      {
        product_id: 7,
        color: "blue",
        size: "XL",
        stock: 65,
        price: 90000,
      },
      {
        product_id: 8,
        color: "green",
        size: "S",
        stock: 35,
        price: 130000,
      },
      {
        product_id: 8,
        color: "green",
        size: "M",
        stock: 35,
        price: 130000,
      },
      {
        product_id: 8,
        color: "green",
        size: "L",
        stock: 35,
        price: 130000,
      },
      {
        product_id: 8,
        color: "green",
        size: "XL",
        stock: 35,
        price: 140000,
      },
      {
        product_id: 8,
        color: "black",
        size: "S",
        stock: 35,
        price: 130000,
      },
      {
        product_id: 8,
        color: "black",
        size: "M",
        stock: 35,
        price: 130000,
      },
      {
        product_id: 8,
        color: "black",
        size: "L",
        stock: 35,
        price: 130000,
      },
      {
        product_id: 8,
        color: "black",
        size: "XL",
        stock: 35,
        price: 140000,
      },
    ],
  });

  await prisma.productGallery.createMany({
    data: [
      {
        photo: "Long-Sleeve-T-shirt-1.jpg",
        product_id: 1,
      },
      {
        photo: "Long-Sleeve-T-shirt-2.jpg",
        product_id: 1,
      },
      {
        photo: "Short-Sleeve-T-shirt-1.jpg",
        product_id: 2,
      },
      {
        photo: "Short-Sleeve-T-shirt-2.jpg",
        product_id: 2,
      },
      {
        photo: "Sweater-1.jpg",
        product_id: 3,
      },
      {
        photo: "Sweater-2.jpg",
        product_id: 3,
      },
      {
        photo: "Jeans-1.jpg",
        product_id: 4,
      },
      {
        photo: "Jeans-2.jpg",
        product_id: 4,
      },
      {
        photo: "Sweatpants-1.jpg",
        product_id: 5,
      },
      {
        photo: "Sweatpants-2.jpg",
        product_id: 5,
      },
      {
        photo: "Shorts-1.jpg",
        product_id: 6,
      },
      {
        photo: "Shorts-2.jpg",
        product_id: 6,
      },
      {
        photo: "Jacket-1.jpg",
        product_id: 7,
      },
      {
        photo: "Jacket-2.jpg",
        product_id: 7,
      },
      {
        photo: "Hoodie-1.jpg",
        product_id: 8,
      },
      {
        photo: "Hoodie-2.jpg",
        product_id: 8,
      },
    ],
  });

  await prisma.admin.createMany({
    data: [
      {
        username: "admin1",
        password:
          "$2b$10$QLkE0KoIcpoXwQpTw1o94OrwDBM0XCr5Q/C2XVNx6zoexCUAPn.eG",
        address: "123 Admin St",
      },
      {
        username: "admin2",
        password:
          "$2b$10$ItfEtkGdU7GoB4800m3JgO7mHZ2MK.YkAGnyHNFNTJ8JFM.m9gepm",
        address: "456 Admin Rd",
      },
    ],
  });

  await prisma.bankAccount.createMany({
    data: [
      {
        account_holder: "-",
        bank_name: "CreditCard",
        account_number: "-",
        admin_id: 1,
      },
      {
        account_holder: "Admin 1",
        bank_name: "BSI",
        account_number: "1234567890",
        admin_id: 1,
      },
      {
        account_holder: "Admin 1",
        bank_name: "BCA",
        account_number: "9876543210",
        admin_id: 1,
      },
      {
        account_holder: "Admin 1",
        bank_name: "BNI",
        account_number: "5678901234",
        admin_id: 1,
      },
      {
        account_holder: "Admin 2",
        bank_name: "BRI",
        account_number: "5432109876",
        admin_id: 2,
      },
      {
        account_holder: "Admin 2",
        bank_name: "Mandiri",
        account_number: "7890123456",
        admin_id: 2,
      },
      {
        account_holder: "Admin 2",
        bank_name: "Permata",
        account_number: "2345678901",
        admin_id: 2,
      },
    ],
  });

  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
