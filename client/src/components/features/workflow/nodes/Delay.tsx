import { Handle, Position } from "@xyflow/react";
import { Timer } from "lucide-react";

const Delay = ({ data }: { data: any }) => {
  return (
    <div className="bg-white p-3 min-w-[200px] rounded-md shadow-lg space-y-2 border-[1px]">
      <Handle
        type="target"
        position={Position.Top}
        id={data.label}
        isConnectable={false}
      />

      <div className="text-lg font-semibold flex gap-2 items-center">
        <Timer /> Delay
      </div>
      <p className="text-md text-gray-700 capitalize">
        {data.results.delay + " " + data.results.delayType}
      </p>
      <Handle
        type="source"
        position={Position.Bottom}
        id={data.label}
        isConnectable={false}
      />
    </div>
  );
};

export default Delay;
