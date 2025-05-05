const {
  addWorkflow,
  getAllWorkflows,
  executeWorkflow,
} = require("../controller/workflow");

const router = require("express").Router();

router.post("/", addWorkflow);
router.get("/", getAllWorkflows);
router.get("/:id/execute", executeWorkflow);

module.exports = router;
