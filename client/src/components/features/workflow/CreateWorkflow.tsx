import React, { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import { toast } from "sonner";
import Title from "@/components/features/workflow/nodes/Title";
import AddNodes from "@/components/features/workflow/nodes/AddNodes";
import Email from "@/components/features/workflow/nodes/Email";
import Delay from "@/components/features/workflow/nodes/Delay";
import { Button } from "@/components/ui/button";
import { calculateDelayInMs } from "@/utils/workflow";
import { usePageLoader } from "@/context/pageLoaderProvider";
import { baseApiUrl } from "@/utils/common";
import {
  AddNodeInterface,
  DelayTypeEnum,
  WorkflowDataInterface,
  WorkFlowNodeTypeEnum,
} from "@/types/workflow";

const NodeTypePickerModal = dynamic(
  import("@/components/features/workflow/NodeTypePickerModal").then(
    (mod) => mod.default
  ),
  { ssr: false }
);

interface Workflow {
  name: string;
}

const CreateWorkflow = () => {
  const [addNodeModalOpened, setAddNodeModalOpened] = useState<boolean>(false);
  const { showPageLoader, hidePageLoader } = usePageLoader();
  const router = useRouter();

  const initialNodes = useMemo(
    () => [
      {
        id: "1",
        position: { x: 0, y: 0 },
        type: "nameUpdater",
        data: { label: "1" },
        deletable: false,
      },
      {
        id: "add",
        position: { x: 100, y: 200 },
        type: "addNewNode",
        deletable: false,
        data: {
          label: "1",
          onAdd: () => {
            setAddNodeModalOpened(true);
          },
        },
      },
    ],
    []
  );

  const initialEdges = useMemo(
    () => [{ id: "e1-2", source: "1", target: "add" }],
    []
  );
  const initialNodesTypes = useMemo(() => {
    return {
      nameUpdater: Title,
      addNewNode: AddNodes,
    };
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeTypes, setNodeTypes] = useState(initialNodesTypes);

  const workflowForm = useForm<Workflow>({ defaultValues: { name: "" } });

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onCloseNodePickerModal = () => {
    setAddNodeModalOpened(false);
  };

  const onAddNode = ({ type, data }: AddNodeInterface) => {
    onCloseNodePickerModal();
    const id = crypto.randomUUID();

    const isEmail = type === WorkFlowNodeTypeEnum.EMAIL;
    const nodeType = isEmail ? "Email" + id : "Delay" + id;

    const nodeLength = nodes.length;

    const lastNode = nodes[nodeLength - 1];
    const lastContentNode = nodes[nodeLength - 2];

    const newNode = {
      id: id,
      position: lastNode.position,
      type: nodeType,
      deletable: false,
      data: {
        label: nodeType,
        results: data,
      },
    };

    const newLastNode = {
      ...nodes[nodeLength - 1],
      position: { x: lastNode.position.x, y: lastNode.position.y + 100 },
    };

    setNodes((prev) => [
      ...prev.slice(0, nodeLength - 1),
      newNode,
      newLastNode,
    ]);

    const newNodeType = { ...nodeTypes, [nodeType]: isEmail ? Email : Delay };
    setNodeTypes(newNodeType);

    const newEdges = [
      ...edges.filter((e) => e.target !== lastNode.id), // remove old edge to add node
      {
        id: `e-${lastContentNode.id}-${id}`,
        source: lastContentNode.id,
        target: id,
      },
      { id: `e-${id}-${lastNode.id}`, source: id, target: lastNode.id },
    ];

    setEdges(newEdges);
  };

  const handleCreateWorkflow = async () => {
    const nodeLength = nodes.length;
    const edgeLength = edges.length;

    if (!workflowForm.getValues("name")) {
      toast.error("Error", {
        description: "Workflow name cannot be empty",
        action: {
          label: "close",
          onClick: () => {},
        },
      });
      return;
    }

    if (nodeLength < 3) {
      toast.error("Error", {
        description: "Workflow must contain 3 nodes",
        action: {
          label: "close",
          onClick: () => {},
        },
      });
      return;
    }

    const requiredNodes = nodes.slice(1, nodeLength - 1);
    const requiredEdges = edges.slice(1, edgeLength - 1);

    const isValidWorkflow = requiredNodes.some((node: any) => {
      return node.data.label.includes("Email");
    });

    if (!isValidWorkflow) {
      toast.error("Error", {
        description: "Workflow must contain email nodes",
        action: {
          label: "close",
          onClick: () => {},
        },
      });

      return;
    }

    const workflowData: WorkflowDataInterface = {
      name: workflowForm.getValues("name"),
      nodes: [],
      edges: requiredEdges,
    };

    const transformedData = requiredNodes.map((node) => {
      if (
        node.data.label.includes("Email") &&
        "results" in node.data &&
        typeof node.data.results === "object"
      ) {
        const results = node.data.results as {
          emailTemplateId: string;
          to: string;
        };

        const { emailTemplateId, to } = results;
        return {
          id: node.id,
          type: WorkFlowNodeTypeEnum.EMAIL,
          position: node.position,
          data: { emailTemplateId, to },
        };
      } else if (
        "results" in node.data &&
        typeof node.data.results === "object"
      ) {
        const { delayType, delay } = node.data.results as {
          delayType: DelayTypeEnum;
          delay: number;
        };
        const delayMs = calculateDelayInMs(delayType, delay);

        return {
          id: node.id,
          type: WorkFlowNodeTypeEnum.DELAY,
          position: node.position,
          data: { delayMs },
        };
      }
    });

    workflowData.nodes = transformedData;

    showPageLoader();

    try {
      const response = await fetch(`${baseApiUrl}/workflow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workflowData),
      });

      if (response.ok) {
        toast.success("Success", {
          description: "Workflow created successfully",
          duration: 2000,
          action: {
            label: "close",
            onClick: () => {},
          },
        });

        router.push("/workflow");
      } else {
        const err = await response.json();
        toast.error("Error", {
          description: err.msg,
          action: {
            label: "close",
            onClick: () => {},
          },
        });
      }
    } catch (err) {
      toast.error("Error", {
        description: "Failed to create email template",
        duration: 2000,
        action: {
          label: "close",
          onClick: () => {},
        },
      });
    } finally {
      hidePageLoader();
    }
  };

  return (
    <div style={{ width: "100%", height: "78vh" }} className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Create your workflow</h1>
        <Button onClick={handleCreateWorkflow}>Create Workflow</Button>
      </div>

      <FormProvider {...workflowForm}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <MiniMap />
          <Background gap={12} size={1} />
        </ReactFlow>
      </FormProvider>

      {addNodeModalOpened && (
        <NodeTypePickerModal
          opened={addNodeModalOpened}
          onClose={onCloseNodePickerModal}
          onAddNode={onAddNode}
        />
      )}
    </div>
  );
};

export default CreateWorkflow;
