const controllers = require("../controllers/address");

const router = require("express").Router();

router.get("/", controllers.getAllAddress);
router.get("/", controllers.getOneAddress);
router.post("/", controllers.newAddress);
router.put("/", controllers.updateAddress);
router.delete("/", controllers.deleteAddress);

module.exports = router;
