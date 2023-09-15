const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");
const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/", verifyTokenUser, updateUser);
router.delete("/", verifyTokenUser, deleteUser);

module.exports = router;
