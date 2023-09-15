const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyTokenMiddleware");
const router = require("express").Router();

router.post("/register", registerUser);
router.get("/login", loginUser);
router.put("/user", verifyToken, updateUser);
router.delete("/user", verifyToken, deleteUser);

module.exports = router;
