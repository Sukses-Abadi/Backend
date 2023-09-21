const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = require("express").Router();

router.get("/:id/:size", async (req, res) => {
  try {
    console.log(req.params);
    const data = await prisma.productDetails.findMany({
      where: {
        product_id: +req.params.id,
        size: {
          contains: req.params.size,
          mode: "insensitive",
        },
      },
    });
    return res.json({
      status: "success",
      message: "this is all the sub category available",
      data: data,
    });
  } catch (error) {
    console.error(error);
    throw new CustomAPIError(
      `error: ${error.message}, please input data correctly`,
      400
    );
  }
});
module.exports = router;
