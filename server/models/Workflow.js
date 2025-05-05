const mongoose = require("mongoose");
const { NodeTypes } = require("../utils/common");

const NodeSchema = new mongoose.Schema(
  {
    id: String,
    type: {
      type: String,
      enum: Object.values(NodeTypes),
      required: true,
    },
    data: mongoose.Schema.Types.Mixed,
    position: { x: Number, y: Number },
  },
  { _id: false }
);

const EdgeSchema = new mongoose.Schema(
  {
    source: String,
    target: String,
  },
  { _id: false }
);

const WorkflowSchema = new mongoose.Schema({
  name: String,
  nodes: [NodeSchema],
  edges: [EdgeSchema],
  triggerType: { type: String, default: "manual" },
});

module.exports = mongoose.model("Workflow", WorkflowSchema);
