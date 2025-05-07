import { DelayTypeEnum, WorkFlowNodeTypeEnum } from "@/types/workflow";
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

export const calculateDelayInMs = (delayType: DelayTypeEnum, delay: number) => {
  const ms = 1000;
  let delayMs = delay;

  switch (delayType) {
    case DelayTypeEnum.HOUR:
      delayMs = delayMs * 60 * 60 * ms;
      break;

    case DelayTypeEnum.MINUTES:
      delayMs = delayMs * 60 * ms;
      break;

    case DelayTypeEnum.SECONDS:
      delayMs = delayMs * ms;
      break;
  }

  return delayMs;
};
