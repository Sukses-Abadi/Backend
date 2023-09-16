const controllers = require("../../controllers/subCategory");

const router = require("express").Router();

router.get("/", controllers.getAllSubCategory);
router.get("/:id", controllers.getOneSubCategory);
router.post("/", controllers.newSubCategory);
router.put("/:id", controllers.updateSubCategory);
router.delete("/:id", controllers.deleteSubCategory);

module.exports = router;
