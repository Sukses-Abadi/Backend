const {
  login,
  getAllAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../../controllers/cms/cms.admin.controller");
const { verifyTokenAdmin } = require("../../middlewares/verifyTokenMiddleware");

const router = require("express").Router();

router.post("/register", createAdmin);
router.get("/login", login);
router.get("/admin", verifyTokenAdmin, getAllAdmin);
router.put("/admin/:id", verifyTokenAdmin, updateAdmin);
router.delete("/admin/:id", verifyTokenAdmin, deleteAdmin);

module.exports = router;
