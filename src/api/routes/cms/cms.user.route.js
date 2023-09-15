const {
  getAllUsersCMS,
  getSingleUserCMS,
  deleteUserCMS,
} = require("../../controllers/cms/cms.user.controller");

const router = require("express").Router();

router.get("/users", getAllUsersCMS);
router.get("/users/:id", getSingleUserCMS);
router.delete("/users/:id", deleteUserCMS);

module.exports = router;
