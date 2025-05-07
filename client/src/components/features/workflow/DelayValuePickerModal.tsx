import { CustomSelectOption } from "@/types/common";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AddNodeInterface,
  DelayTypeEnum,
  DelayValueInterface,
  WorkFlowNodeTypeEnum,
} from "@/types/workflow";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CommonInput } from "@/components/form/CommonInput";
import AsyncSearchSelectField from "@/components/form/AsyncSearchSelectField/AsyncSearchSelectField";
import { Button } from "@/components/ui/button";

const DelayValuePickerModal = ({
  opened,
  onClose,
  onAddNode,
}: {
  opened: boolean;
  onClose: () => void;
  onAddNode: ({ type, data }: AddNodeInterface) => void;
}) => {
  const delayValueForm = useForm<DelayValueInterface>({
    defaultValues: { delay: 0, delayType: null },
  });

  const { handleSubmit } = delayValueForm;

  const onAddDelay: SubmitHandler<DelayValueInterface> = (data) => {
    const { delayType, delay } = data;

    let delayMs = +delay;
    const ms = 1000;

    if (!delayType) return;

    switch (delayType.value) {
      case DelayTypeEnum.HOUR:
        delayMs = delayMs * 60 * 60 * ms;

      case DelayTypeEnum.MINUTES:
        delayMs = delayMs * 60 * ms;

      case DelayTypeEnum.SECONDS:
        delayMs = delayMs * ms;
    }

    onAddNode({
      type: WorkFlowNodeTypeEnum.DELAY,
      data: { delayMs },
    });
  };

  const getDelayOptions = (
    val: string
  ): Promise<Array<CustomSelectOption<string>>> => {
    const delayData = Object.values(DelayTypeEnum);

    const filtered = delayData
      .filter((delay) => delay.includes(val))
      .map((delay) => ({
        label: delay.toUpperCase(),
        value: delay,
      }));

    return Promise.resolve(filtered);
  };

  return (
    <Dialog open={opened} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onAddDelay)}>
          <DialogHeader className="space-y-3">
            <DialogTitle>Email</DialogTitle>

            <CommonInput
              hForm={delayValueForm}
              label="Delay"
              name="delay"
              showError
              placeholder="Enter the delay"
              type="number"
              registerOptions={{
                required: "Delay is required",
              }}
              inputClassName="rounded-md"
            />

            <AsyncSearchSelectField
              hForm={delayValueForm}
              rules={{
                required: "Delay type is required",
              }}
              name={"delayType"}
              label="delay"
              getOptions={getDelayOptions}
              isSearchable
              isMulti={false}
              instanceId="delay"
              isClearable
              placeholder="Select the delay type"
            />
          </DialogHeader>
          <DialogFooter className="sm:justify-start mt-4 w-full flex gap-3">
            <DialogClose asChild>
              <Button
                type="button"
                onClick={() => {
                  onClose();
                }}
                className="h-[44px] md:h-[48px] bg-white shadow-sm text-app-black-300 text-[16px] 
              border-[1px] border-app-gray-100 w-full hover:bg-gray-50 rounded-[10px]"
              >
                Close
              </Button>
            </DialogClose>
            <Button
              className={`bg-app-accent-success-600 hover:bg-app-accent-success-700 text-white border-[1px] border-app-accent-success-600 rounded-[10px] h-[44px] md:h-[48px] text-[16px] w-full`}
              type="submit"
            >
              Yes Confirm
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DelayValuePickerModal;
