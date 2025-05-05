const WorkflowSchema = require("../models/Workflow");
const { StatusCodes } = require("http-status-codes");
const {
  executeWorkflowByUser,
  hasCycle,
  hasDisconnectedEdges,
} = require("../utils/workflow");
const BadRequestError = require("../errors/bad-request");

const addWorkflow = async (req, res) => {
  const { nodes, edges } = req.body;

  if (hasDisconnectedEdges(nodes, edges)) {
    throw new BadRequestError("Nodes and edges are not matching");
  }

  if (hasCycle(nodes, edges)) {
    throw new BadRequestError("Workflow cannot contain cycles");
  }

  const workflow = new WorkflowSchema(req.body);
  await workflow.save();
  res.status(StatusCodes.CREATED).json(workflow);
};

const getAllWorkflows = async (req, res) => {
  const workflows = await WorkflowSchema.find();
  res.status(StatusCodes.OK).json(workflows);
};

const executeWorkflow = async (req, res) => {
  const workflowId = req.params.id;
  const workflow = await WorkflowSchema.findById(workflowId);
  await executeWorkflowByUser(workflow);
  res.status(StatusCodes.OK).send("started, workflow with id : " + workflowId);
};

module.exports = { addWorkflow, getAllWorkflows, executeWorkflow };
