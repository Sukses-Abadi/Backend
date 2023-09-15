const controllers = require("../../controllers/subCategory");

const router = require("express").Router();

router.get("/subcategory", controllers.getAllSubCategory);
router.get("/subcategory/:id", controllers.getOneSubCategory);
router.post("/subcategory", controllers.newSubCategory);
router.put("/subcategory/:id", controllers.updateSubCategory);
router.delete("/subcategory/:id", controllers.deleteSubCategory);

module.exports = router;
