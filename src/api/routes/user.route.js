const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserId,
} = require("../controllers/user.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");
const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/", verifyTokenUser, updateUser);
router.delete("/", verifyTokenUser, deleteUser);
router.get("/", verifyTokenUser, getUserId);

module.exports = router;
