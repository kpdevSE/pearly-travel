const { PrismaClient } = require("@prisma/client");

const prismadb = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prismadb;
}

module.exports = prismadb;
