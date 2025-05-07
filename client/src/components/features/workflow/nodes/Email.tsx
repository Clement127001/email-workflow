import { Handle, Position } from "@xyflow/react";
import { Mail } from "lucide-react";

const Email = ({ data }: { data: any }) => {
  return (
    <div className="bg-white p-3 min-w-[200px] rounded-md shadow-lg space-y-2 border-[1px]">
      <Handle
        type="target"
        position={Position.Top}
        id={data.label}
        isConnectable={false}
      />
      <div className="text-lg font-semibold flex gap-2 items-center">
        <Mail /> Email
      </div>
      <p className="text-md text-gray-700">{data.results.emailTemplateName}</p>
      <Handle
        type="source"
        position={Position.Bottom}
        id={data.label}
        isConnectable={false}
      />
    </div>
  );
};

export default Email;
