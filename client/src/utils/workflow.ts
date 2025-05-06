import { WorkFlowNodeTypeEnum } from "@/types/workflow";
import { Mail, Timer } from "lucide-react";

export const workflowNodes = [
  {
    Icon: Mail,
    title: "mail",
    type: WorkFlowNodeTypeEnum.EMAIL,
  },
  {
    Icon: Timer,
    title: "delay",
    type: WorkFlowNodeTypeEnum.DELAY,
  },
];
