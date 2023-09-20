const router = require("express").Router();

const CustomAPIError = require("../middlewares/custom-error");
const { findAll, findOne } = require("../services/subcategory.service");

router.get("/", async (req, res) => {
  try {
    const data = await findAll(req.query);
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

router.get("/:id", async (req, res) => {
  try {
    const data = await findOne(req.params);
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
