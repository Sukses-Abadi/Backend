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
        photo: "/uploads/Long-Sleeve-T-shirt/black.jpg",
        product_id: 1,
      },
      {
        photo: "/uploads/Long-Sleeve-T-shirt/white.jpg",
        product_id: 1,
      },
      {
        photo: "/uploads/Short-Sleeve-T-shirt/black.jpg",
        product_id: 2,
      },
      {
        photo: "/uploads/Short-Sleeve-T-shirt/white.jpg",
        product_id: 2,
      },
      {
        photo: "/uploads/Sweater/black.jpg",
        product_id: 3,
      },
      {
        photo: "/uploads/Sweater/white.jpg",
        product_id: 3,
      },
      {
        photo: "/uploads/Jeans/red.jpg",
        product_id: 4,
      },
      {
        photo: "/uploads/Jeans/blue.jpg",
        product_id: 4,
      },
      {
        photo: "/uploads/Sweatpants/black.jpg",
        product_id: 5,
      },
      {
        photo: "/uploads/Sweatpants/white.jpg",
        product_id: 5,
      },
      {
        photo: "/uploads/Shorts/black.jpg",
        product_id: 6,
      },
      {
        photo: "/uploads/Shorts/blue.jpg",
        product_id: 6,
      },
      {
        photo: "/uploads/Jacket/red.jpg",
        product_id: 7,
      },
      {
        photo: "/uploads/Jacket/blue.jpg",
        product_id: 7,
      },
      {
        photo: "/uploads/Hoodie/black.jpg",
        product_id: 8,
      },
      {
        photo: "/uploads/Hoodie/green.jpg",
        product_id: 8,
      },
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        username: "user1",
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        age: 25,
        password:
          "$2b$10$W3vKECwAD.QGCiSVlknuw.B.iGlOGDXliWtrfFCrtw5obe8ulVM6y",
        phone: "1234567890",
      },
      {
        username: "user2",
        first_name: "Alice",
        last_name: "Smith",
        email: "alice.smith@example.com",
        age: 30,
        password:
          "$2b$10$N9fElMEmnlHb0mDglDeVeeOqsYAEcuXuXTe78jHHanXmyAJVa2fvW",
        phone: "9876543210",
      },
      {
        username: "user3",
        first_name: "Ethan",
        last_name: "Johnson",
        email: "ethan.johnson@example.com",
        age: 28,
        password:
          "$2b$10$gqxD7Q0TA6kGF.T0UMlSiefyLey4LXXXd/fO.aO5sfHoEazlacONK",
        phone: "5551237890",
      },
      {
        username: "user4",
        first_name: "Olivia",
        last_name: "Davis",
        email: "olivia.davis@example.com",
        age: 22,
        password:
          "$2b$10$VdD81jN3H5I6U1JMHrRZ7uiu97.gLSc1fKgLgepv2Qy0yXsRwgnRC",
        phone: "9995551234",
      },
      {
        username: "user5",
        first_name: "Sophia",
        last_name: "Miller",
        email: "sophia.miller@example.com",
        age: 35,
        password:
          "$2b$10$FHkIzh955vuk/YUW2P..fuvHXIyJGlNUSAZ.ehDVroBv9.Roc/z/i",
        phone: "1237894560",
      },
    ],
  });

  await prisma.address.createMany({
    data: [
      {
        street: "123 Main St",
        name: "Home",
        city_id: 1,
        zip_code: 12345,
        user_id: 1,
      },
      {
        street: "456 Elm St",
        name: "Work",
        city_id: 2,
        zip_code: 67890,
        user_id: 1,
      },
      {
        street: "789 Oak Ave",
        name: "Home",
        city_id: 1,
        zip_code: 54321,
        user_id: 2,
      },
      {
        street: "101 Pine Rd",
        name: "Work",
        city_id: 3,
        zip_code: 98765,
        user_id: 2,
      },
      {
        street: "222 Maple Ln",
        name: "Home",
        city_id: 2,
        zip_code: 24680,
        user_id: 3,
      },
      {
        street: "333 Cedar Blvd",
        name: "Work",
        city_id: 1,
        zip_code: 13579,
        user_id: 3,
      },
      {
        street: "444 Birch Rd",
        name: "Home",
        city_id: 3,
        zip_code: 86420,
        user_id: 4,
      },
      {
        street: "555 Redwood Dr",
        name: "Work",
        city_id: 2,
        zip_code: 36912,
        user_id: 4,
      },
      {
        street: "666 Willow Ave",
        name: "Home",
        city_id: 1,
        zip_code: 75319,
        user_id: 5,
      },
      {
        street: "777 Spruce Rd",
        name: "Work",
        city_id: 3,
        zip_code: 85246,
        user_id: 5,
      },
    ],
  });

  await prisma.admin.createMany({
    data: [
      {
        username: "admin1",
        password:
          "$2b$10$QLkE0KoIcpoXwQpTw1o94OrwDBM0XCr5Q/C2XVNx6zoexCUAPn.eG",
        city_id: 1,
        address: "123 Admin St",
      },
      {
        username: "admin2",
        password:
          "$2b$10$ItfEtkGdU7GoB4800m3JgO7mHZ2MK.YkAGnyHNFNTJ8JFM.m9gepm",
        city_id: 2,
        address: "456 Admin Rd",
      },
    ],
  });

  await prisma.bankAccount.createMany({
    data: [
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
