const EmailTemplate = require("../models/EmailTemplate");
const agenda = require("../agenda");

async function executeWorkflowByUser(workflow) {
  const nodeMap = Object.fromEntries(workflow.nodes.map((n) => [n.id, n]));
  const edgeMap = Object.groupBy(workflow.edges, (e) => e.source);

  let currentNode = workflow.nodes[0];
  let delayMs = 0;

  while (currentNode) {
    if (currentNode.type === "delay") {
      delayMs += currentNode.data.delayMs || 0;
    }

    if (currentNode.type === "email") {
      const emailTemplate = await EmailTemplate.findById(
        currentNode.data.emailTemplateId
      );
      if (emailTemplate) {
        await agenda.schedule(new Date(Date.now() + delayMs), "send-email", {
          to: emailTemplate.data.to,
          subject: emailTemplate.subject,
          html: emailTemplate.body,
        });
      }
    }

    const nextEdge = (edgeMap[currentNode.id] || [])[0];
    currentNode = nextEdge ? nodeMap[nextEdge.target] : null;
  }
}

function hasCycle(nodes, edges) {
  const graph = {};
  const visited = {};
  const recStack = {};

  for (const node of nodes) {
    graph[node.id] = [];
  }

  for (const edge of edges) {
    if (graph[edge.source]) {
      graph[edge.source].push(edge.target);
    }
  }

  function dfs(nodeId) {
    if (!visited[nodeId]) {
      visited[nodeId] = true;
      recStack[nodeId] = true;

      for (const neighbor of graph[nodeId]) {
        if (!visited[neighbor] && dfs(neighbor)) return true;
        else if (recStack[neighbor]) return true;
      }
    }
    recStack[nodeId] = false;
    return false;
  }

  for (const node of nodes) {
    if (dfs(node.id)) return true;
  }

  return false;
}

function hasDisconnectedEdges(nodes, edges) {
  const connectedNodeIds = new Set();

  for (let edge of edges) {
    if (edge.source) connectedNodeIds.add(edge.source);
    if (edge.target) connectedNodeIds.add(edge.target);
  }

  for (let node of nodes) {
    if (!connectedNodeIds.has(node.id)) {
      return true;
    }
  }

  return false;
}

module.exports = { executeWorkflowByUser, hasDisconnectedEdges, hasCycle };
