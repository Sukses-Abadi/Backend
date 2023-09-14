const { PrismaClient } = require("@prisma/client");

let prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

// const isProduction = process.env.NODE_ENV === 'production'

// if (isProduction) {
//   prisma = new PrismaClient()
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient()
//   }

//   prisma = global.prisma
// }

module.exports = prisma;
