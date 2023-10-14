const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const fs = require("fs");

const createCities = async () => {
  try {
    const citiesData = JSON.parse(fs.readFileSync("/cities.json", "utf8"));

    for (const cityData of citiesData) {
      const { id, name } = cityData;

      await prisma.city.create({
        data: {
          id,
          name,
        },
      });
    }

    console.log("Cities created successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
};

createCities();
async function main() {
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
        photo:
          "https://firebasestorage.googleapis.com/v0/b/sukses-abadi.appspot.com/o/Long-Sleeve-T-shirt-1.jpg?alt=media&token=08cf6582-96ac-48d2-8096-4ea0f1badc53&_gl=1*1tg41jv*_ga*MTEwMTA5MjIyNS4xNjk3MjcwMjQ5*_ga_CW55HF8NVT*MTY5NzI5MTMwMi41LjEuMTY5NzI5MTM1Ni42LjAuMA..",
        product_id: 1,
      },
      {
        photo:
          "https://firebasestorage.googleapis.com/v0/b/sukses-abadi.appspot.com/o/Long-Sleeve-T-shirt-2.jpg?alt=media&token=8e452632-2020-4b32-8122-b0d1e8ce1a37&_gl=1*i5n6rg*_ga*MTEwMTA5MjIyNS4xNjk3MjcwMjQ5*_ga_CW55HF8NVT*MTY5NzI5MTMwMi41LjEuMTY5NzI5MTM3MC42MC4wLjA.",
        product_id: 1,
      },
      {
        photo:
          "https://firebasestorage.googleapis.com/v0/b/sukses-abadi.appspot.com/o/Short-Sleeve-T-shirt-1.jpg?alt=media&token=8ad38e1b-158c-48b8-90d8-76c8e8d4dcd0&_gl=1*13wryaq*_ga*MTEwMTA5MjIyNS4xNjk3MjcwMjQ5*_ga_CW55HF8NVT*MTY5NzI5MTMwMi41LjEuMTY5NzI5MTM4Ni40NC4wLjA.",
        product_id: 2,
      },
      {
        photo:
          "https://firebasestorage.googleapis.com/v0/b/sukses-abadi.appspot.com/o/Short-Sleeve-T-shirt-2.jpg?alt=media&token=3dc697da-8283-48a1-b4e9-16299383c17e&_gl=1*a579ry*_ga*MTEwMTA5MjIyNS4xNjk3MjcwMjQ5*_ga_CW55HF8NVT*MTY5NzI5MTMwMi41LjEuMTY5NzI5MTQwNi4yNC4wLjA.",
        product_id: 2,
      },
      {
        photo:
          "https://firebasestorage.googleapis.com/v0/b/sukses-abadi.appspot.com/o/Sweater-1.jpg?alt=media&token=bce127a1-b64e-4365-815d-5727583e26ee&_gl=1*fsnxq4*_ga*MTEwMTA5MjIyNS4xNjk3MjcwMjQ5*_ga_CW55HF8NVT*MTY5NzI5MTMwMi41LjEuMTY5NzI5MTQxNy4xMy4wLjA.",
        product_id: 3,
      },
      {
        photo:
          "https://firebasestorage.googleapis.com/v0/b/sukses-abadi.appspot.com/o/Sweater-2.jpg?alt=media&token=26f94c65-dbf0-4ec5-b35f-b90f096066a4&_gl=1*1xu9tdq*_ga*MTEwMTA5MjIyNS4xNjk3MjcwMjQ5*_ga_CW55HF8NVT*MTY5NzI5MTMwMi41LjEuMTY5NzI5MTQyNi40LjAuMA..",
        product_id: 3,
      },
      {
        photo:
          "https://firebasestorage.googleapis.com/v0/b/sukses-abadi.appspot.com/o/Jeans-1.jpg?alt=media&token=2911b0b9-a114-423b-878a-ec3af8bb38b1&_gl=1*i7sqo4*_ga*MTEwMTA5MjIyNS4xNjk3MjcwMjQ5*_ga_CW55HF8NVT*MTY5NzI5MTMwMi41LjEuMTY5NzI5MTQ0Mi42MC4wLjA.",
        product_id: 4,
      },
      {
        photo:
          "https://firebasestorage.googleapis.com/v0/b/sukses-abadi.appspot.com/o/Jeans-2.jpg?alt=media&token=a1cd76f6-6c64-4c75-82e1-0e3d90a2b46b&_gl=1*myuhne*_ga*MTEwMTA5MjIyNS4xNjk3MjcwMjQ5*_ga_CW55HF8NVT*MTY5NzI5MTMwMi41LjEuMTY5NzI5MTQ0OS41My4wLjA.",
        product_id: 4,
      },
      {
        photo:
          "https://firebasestorage.googleapis.com/v0/b/sukses-abadi.appspot.com/o/Sweatpants-1.jpg?alt=media&token=ed759e4a-7540-4711-a5a1-cb7689d65b15&_gl=1*tqyoer*_ga*MTEwMTA5MjIyNS4xNjk3MjcwMjQ5*_ga_CW55HF8NVT*MTY5NzI5MTMwMi41LjEuMTY5NzI5MTQ2Mi40MC4wLjA.",
        product_id: 5,
      },
      {
        photo:
          "https://firebasestorage.googleapis.com/v0/b/sukses-abadi.appspot.com/o/Sweatpants-2.jpg?alt=media&token=ae9e9304-212e-45d9-bec5-2964910d0b45&_gl=1*15daj2s*_ga*MTEwMTA5MjIyNS4xNjk3MjcwMjQ5*_ga_CW55HF8NVT*MTY5NzI5MTMwMi41LjEuMTY5NzI5MTQ3NC4yOC4wLjA.",
        product_id: 5,
      },
      {
        photo:
          "https://firebasestorage.googleapis.com/v0/b/sukses-abadi.appspot.com/o/Shorts-1.jpg?alt=media&token=d425cd72-5f18-477f-bb6b-3bae2e0f7415&_gl=1*14c3rye*_ga*MTEwMTA5MjIyNS4xNjk3MjcwMjQ5*_ga_CW55HF8NVT*MTY5NzI5MTMwMi41LjEuMTY5NzI5MTQ4NS4xNy4wLjA.",
        product_id: 6,
      },
      {
        photo:
          "https://firebasestorage.googleapis.com/v0/b/sukses-abadi.appspot.com/o/Shorts-2.jpg?alt=media&token=5558b23a-617f-41cf-b61e-5ec955aeb4b5&_gl=1*c065ts*_ga*MTEwMTA5MjIyNS4xNjk3MjcwMjQ5*_ga_CW55HF8NVT*MTY5NzI5MTMwMi41LjEuMTY5NzI5MTQ5My45LjAuMA..",
        product_id: 6,
      },
      {
        photo:
          "https://firebasestorage.googleapis.com/v0/b/sukses-abadi.appspot.com/o/Jacket-1.jpg?alt=media&token=5ab58c9b-8d93-4736-9b4d-70ca54b1f7e3&_gl=1*wegvsq*_ga*MTEwMTA5MjIyNS4xNjk3MjcwMjQ5*_ga_CW55HF8NVT*MTY5NzI5MTMwMi41LjEuMTY5NzI5MTUwOC42MC4wLjA.",
        product_id: 7,
      },
      {
        photo:
          "https://firebasestorage.googleapis.com/v0/b/sukses-abadi.appspot.com/o/Jacket-2.jpg?alt=media&token=865713c7-3471-4f41-895d-b6c398d6a85d&_gl=1*1i5xsi0*_ga*MTEwMTA5MjIyNS4xNjk3MjcwMjQ5*_ga_CW55HF8NVT*MTY5NzI5MTMwMi41LjEuMTY5NzI5MTUyMy40NS4wLjA.",
        product_id: 7,
      },
      {
        photo:
          "https://firebasestorage.googleapis.com/v0/b/sukses-abadi.appspot.com/o/Hoodie-1.jpg?alt=media&token=47c634c3-f1dc-47d3-ac1b-9dc95d29a597&_gl=1*gas7ku*_ga*MTEwMTA5MjIyNS4xNjk3MjcwMjQ5*_ga_CW55HF8NVT*MTY5NzI5MTMwMi41LjEuMTY5NzI5MTUzMS4zNy4wLjA.",
        product_id: 8,
      },
      {
        photo:
          "https://firebasestorage.googleapis.com/v0/b/sukses-abadi.appspot.com/o/Hoodie-2.jpg?alt=media&token=d4fe77c2-7ca7-425f-8824-d08963f0230b&_gl=1*k3j6mg*_ga*MTEwMTA5MjIyNS4xNjk3MjcwMjQ5*_ga_CW55HF8NVT*MTY5NzI5MTMwMi41LjEuMTY5NzI5MTUzOS4yOS4wLjA.",
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

  console.log("Seed data created successfully.");
}

main()
  .then(createCities())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
