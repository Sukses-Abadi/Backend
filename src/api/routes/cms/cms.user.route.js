const {
  getAllUsersCMS,
  getSingleUserCMS,
  deleteUserCMS,
} = require("../../controllers/cms/cms.user.controller");

const router = require("express").Router();

router.get("/", getAllUsersCMS);
router.get("/:id", getSingleUserCMS);
router.delete("/:id", deleteUserCMS);

module.exports = router;
