import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import { FormProvider, useForm } from "react-hook-form";
import Title from "@/components/features/workflow/nodes/Title";
import AddNodes from "@/components/features/workflow/nodes/AddNodes";
import { AddNodeInterface } from "@/types/workflow";

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

  const initialNodes = [
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
  ];

  const initialEdges = [{ id: "e1-2", source: "1", target: "add" }];
  const initialNodesTypes = {
    nameUpdater: Title,
    addNewNode: AddNodes,
  };

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
    console.log(type, data);
    // remove the last node
    // add new new node before previous node
    // add the new node picker as the last node
    // change the edges
  };

  const handleCreateWorkflow = () => {
    //get the data from the nodes.data, nodes.id, nodes.position
    //get the edges from the edges
  };

  return (
    <div style={{ width: "100%", height: "78vh" }}>
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
