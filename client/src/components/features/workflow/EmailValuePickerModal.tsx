import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  AddNodeInterface,
  EmailValueInterface,
  WorkFlowNodeTypeEnum,
} from "@/types/workflow";
import { CommonInput } from "@/components/form/CommonInput";
import { baseApiUrl } from "@/utils/common";
import AsyncSearchSelectField from "@/components/form/AsyncSearchSelectField/AsyncSearchSelectField";

const EmailValuePickerModal = ({
  opened,
  onClose,
  onAddNode,
}: {
  opened: boolean;
  onClose: () => void;
  onAddNode: ({ type, data }: AddNodeInterface) => void;
}) => {
  const emailValueForm = useForm<EmailValueInterface>({
    defaultValues: { emailTemplateId: null, to: "" },
  });

  const { handleSubmit } = emailValueForm;

  const getEmailTemplates = async (val: string) => {
    try {
      const response = await fetch(baseApiUrl + "/email");
      const data = await response.json();

      return data
        .filter((genre: { _id: string; name: string }) =>
          genre.name.toLowerCase().includes(val)
        )
        .map((genre: { _id: string; name: string }) => ({
          value: genre._id,
          label: genre.name,
        }));
    } catch (err) {
      console.error("Error fetching genres", err);
      return [];
    }
  };

  const onAddEmail: SubmitHandler<EmailValueInterface> = (data) => {
    const { emailTemplateId, to } = data;

    if (!emailTemplateId) return;

    onAddNode({
      type: WorkFlowNodeTypeEnum.EMAIL,
      data: { emailTemplateId: emailTemplateId.value, to },
    });
  };

  return (
    <Dialog open={opened} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onAddEmail)}>
          <DialogHeader className="space-y-3">
            <DialogTitle>Email</DialogTitle>

            <CommonInput
              hForm={emailValueForm}
              label="To"
              name="to"
              showError
              placeholder="Enter the to address"
              registerOptions={{
                required: "To address is required",
                minLength: {
                  value: 3,
                  message: "To address should have 3 character at least",
                },
                maxLength: {
                  value: 30,
                  message: "To address should have 30 character at most",
                },
              }}
              inputClassName="rounded-md"
            />

            <AsyncSearchSelectField
              hForm={emailValueForm}
              rules={{
                required: "Email Template is required",
              }}
              name={"emailTemplateId"}
              label="Genre"
              getOptions={getEmailTemplates}
              isSearchable
              isMulti={false}
              instanceId="emailTemplate"
              isClearable
              placeholder="Select the email template"
            />
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

export default EmailValuePickerModal;
