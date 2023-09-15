const controllers = require("../../controllers/category");

const router = require("express").Router();

router.get("/category", controllers.getAllCategory);
router.get("/category/:id", controllers.getOneCategory);
router.post("/category", controllers.newCategory);
router.put("/category/:id", controllers.updateCategory);
router.delete("/category/:id", controllers.deleteCategory);

module.exports = router;
