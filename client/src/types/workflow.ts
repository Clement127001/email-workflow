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
    to?: string;
    delayMs?: number;
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
