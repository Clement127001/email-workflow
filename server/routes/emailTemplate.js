const {
  addEmailTemplate,
  getAllEmailTemplate,
} = require("../controller/emailTemplate");

const router = require("express").Router();

router.post("/", addEmailTemplate);
router.get("/", getAllEmailTemplate);

module.exports = router;
