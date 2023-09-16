const controllers = require("../controllers/address");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");
const router = require("express").Router();

router.get("/", controllers.getAllAddress);
router.get("/", controllers.getOneAddress);
router.post("/", controllers.newAddress);
router.put("/", verifyTokenUser, controllers.updateAddress);
router.delete("/", controllers.deleteAddress);

module.exports = router;
