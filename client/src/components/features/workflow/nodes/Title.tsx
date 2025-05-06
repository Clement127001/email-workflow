import { CommonInput } from "@/components/form/CommonInput";
import { Handle, Position } from "@xyflow/react";
import { useFormContext } from "react-hook-form";

export default function Title() {
  const hForm = useFormContext();

  return (
    <div className="bg-white p-5 rounded-md shadow-lg">
      <CommonInput
        label={"Workflow Name"}
        placeholder={"Enter "}
        hForm={hForm}
        name={"name"}
        registerOptions={{ required: "Workflow name is required" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="1"
        isConnectable={false}
      />
    </div>
  );
}
