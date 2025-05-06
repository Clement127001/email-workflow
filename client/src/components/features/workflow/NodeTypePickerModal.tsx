import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Timer } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { WorkFlowNodeTypeEnum } from "@/types/workflow";
import { workflowNodes } from "@/utils/workflow";

const NodeTypePickerModal = ({
  opened,
  onClose,
  onClickConfirm,
  confirmText,
  confirmClassname,
}: {
  opened: boolean;
  onClose: () => void;
  onClickConfirm: () => void;
  confirmText?: string;
  confirmClassname?: string;
}) => {
  const [activeNode, setActiveNode] = useState<WorkFlowNodeTypeEnum>(
    WorkFlowNodeTypeEnum.EMAIL
  );

  return (
    <Dialog open={opened} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <DialogTitle>Node Type</DialogTitle>
          <DialogDescription>Pick the type of node to add</DialogDescription>
          <div className={`grid grid-cols-2 gap-2`}>
            {workflowNodes.map((node) => {
              const { Icon, title, type } = node;

              const isActive = activeNode === type;

              return (
                <div
                  className={`border-[1px] rounded-sm flex items-center p-3 gap-2 ${
                    isActive && "border-app-primary-600 text-app-primary-700"
                  }`}
                  onClick={() => {
                    setActiveNode(type);
                  }}
                >
                  <Icon />
                  <p>{title}</p>
                </div>
              );
            })}
          </div>
        </DialogHeader>
        <DialogFooter className="sm:justify-start mt-4 w-full flex gap-3">
          <DialogClose asChild>
            <Button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="h-[44px] md:h-[48px] bg-white shadow-sm text-app-black-300 text-[16px] 
              border-[1px] border-app-gray-100 w-full hover:bg-gray-50 rounded-[10px]"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            className={`bg-app-accent-success-600 hover:bg-app-accent-success-700 text-white border-[1px] border-app-accent-success-600 rounded-[10px] h-[44px] md:h-[48px] text-[16px] w-full ${confirmClassname}`}
            onClick={onClickConfirm}
          >
            {confirmText ?? "Yes Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NodeTypePickerModal;
