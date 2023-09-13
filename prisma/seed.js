const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Create Categories
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
