const controllers = require("../controllers/address");
// const { route } = require("./address.route");

const router = require("express").Router();

router.get("/user/address", controllers.getAllAddress);
router.get("/user/:id/address", controllers.getOneAddress);
router.post("/user/:id/address", controllers.newAddress);
router.put("/user/:id/address", controllers.updateAddress);
router.delete("/user/:id/address", controllers.deleteAddress);

module.exports = router;
