const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = require("express").Router();

router.post("/register", registerUser);
router.get("/login", loginUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
