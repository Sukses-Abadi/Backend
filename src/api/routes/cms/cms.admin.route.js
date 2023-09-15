const {
  login,
  getAllAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../../controllers/cms/cms.admin.controller");
const verifyToken = require("../../middlewares/verifyTokenMiddleware");

const router = require("express").Router();

router.post("/register", createAdmin);
router.get("/login", login);
router.get("/admin", verifyToken, getAllAdmin);
router.put("/admin/:id", verifyToken, updateAdmin);
router.delete("/admin/:id", verifyToken, deleteAdmin);

module.exports = router;
