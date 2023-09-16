const {
    addNewCity,
    fetchCities,
    fetchCityById,
    removeCityById,
    editCityById,
  } = require("../controllers/city.controller");

const router = require("express").Router();

router.get("/", fetchCities);
router.get("/:id", fetchCityById);
router.post("/", addNewCity);
router.delete("/:id", removeCityById)
router.put("/:id", editCityById)

module.exports = router;