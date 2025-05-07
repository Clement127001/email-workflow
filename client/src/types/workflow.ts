export enum WorkFlowNodeTypeEnum {
  EMAIL = "email",
  DELAY = "delay",
}

export enum DelayTypeEnum {
  HOUR = "hour",
  MINUTES = "minutes",
  SECONDS = "seconds",
}

export interface AddNodeInterface {
  type: WorkFlowNodeTypeEnum;
  data: {
    emailTemplateId?: string;
    emailTemplateName?: string;
    to?: string;
    delayType?: DelayTypeEnum;
    delay?: number;
  };
}

type OptionInterface = { value: string; label: string };

export interface EmailValueInterface {
  to: string;
  emailTemplateId: OptionInterface | null;
}

export interface DelayValueInterface {
  delay: number;
  delayType: OptionInterface | null;
}

export interface WorkflowDataInterface {
  name: string;
  nodes: any[];
  edges: {
    id: string;
    source: string;
    target: string;
  }[];
}

export interface WorkflowData {
  id: string;
  name: string;
  createdAt: string;
}
