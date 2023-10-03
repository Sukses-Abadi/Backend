const router = require("express").Router();
const axios = require("axios");
const CustomAPIError = require("../middlewares/custom-error");
router.post("/", async (req, res) => {
  try {
    const body = {
      origin: process.env.origin,
      destination: req.body.destination,
      weight: req.body.weight,
      courier: req.body.courier,
    };
    console.log(body);
    const headers = {
      headers: {
        key: "c7dbdb8918f7b450e0af4ed786dc6834",
      },
    };
    const response = await axios.post(
      "https://api.rajaongkir.com/starter/cost",
      body,
      headers
    );
    console.log(response);
    let data = [];
    const results = response.data.rajaongkir.results;
    const costs = results.map((result) => result.costs).flat();
    costs.forEach((element, index) => {
      data[index] = element;
    });

    return res.json({
      status: "success",
      message: "this is the option for shipping",
      data: [...data],
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
