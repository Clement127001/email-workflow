import { Handle, Position, useNodesData } from "@xyflow/react";
import { Plus } from "lucide-react";

const AddNodes = () => {
  const addData: any = useNodesData("add");

  return (
    <div>
      <Handle
        type="target"
        position={Position.Top}
        id="add"
        isConnectable={false}
      />
      <div
        className="bg-app-accent-success-500 text-white rounded-full p-2"
        onClick={() => {
          if (addData) {
            addData.data.onAdd();
          }
        }}
      >
        <Plus size={18} />
      </div>
    </div>
  );
};

export default AddNodes;
