const prisma = require("../../lib/prisma");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");
const router = require("express").Router();

router.put("/:id", verifyTokenUser, async (req, res) => {
  const { quantity } = req.body;
  const data = await prisma.cartProduct.update({
    where: { id: +req.params.id },
    data: { quantity: +quantity },
  });
  console.log(data);
  return res.json({
    status: "success",
    message: "quantity updated successfully",
    data: data,
  });
});

router.delete("/:id", verifyTokenUser, async (req, res) => {
  const data = prisma.cartProduct.delete({ where: { id: +req.params.id } });
  return res.json({
    status: "success",
    message: "quantity updated successfully",
    data: data,
  });
  
});

module.exports = router;
