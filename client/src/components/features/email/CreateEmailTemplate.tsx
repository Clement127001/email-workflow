import { Plus } from "lucide-react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { CommonInput } from "@/components/form/CommonInput";
import { CommonTextArea } from "@/components/form/CommonTextArea";
import { Button } from "@/components/ui/button";
import { CreateEmail } from "@/types/email";
import { usePageLoader } from "@/context/pageLoaderProvider";
import { baseApiUrl } from "@/utils/common";

const CreateEmailTemplate = () => {
  const createEmailForm = useForm<CreateEmail>({
    defaultValues: { subject: "", body: "", name: "" },
  });

  const { showPageLoader, hidePageLoader } = usePageLoader();
  const router = useRouter();

  const { handleSubmit } = createEmailForm;
  const onCreateEmail: SubmitHandler<CreateEmail> = async (data) => {
    showPageLoader("Creating email template");

    try {
      const userToken = Cookies.get("userToken");
      const response = await fetch(`${baseApiUrl}/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Success", {
          description: "Email template created successfully",
          duration: 2000,
          action: {
            label: "close",
            onClick: () => {},
          },
        });

        router.push("/email");
      } else {
        const err = await response.json();
        toast.error("Error", {
          description: err.msg,
          action: {
            label: "close",
            onClick: () => {},
          },
        });
      }
    } catch (_) {
      toast.error("Error", {
        description: "Failed to create email template",
        duration: 2000,
        action: {
          label: "close",
          onClick: () => {},
        },
      });
    } finally {
      hidePageLoader();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onCreateEmail)}
      className="py-3 pb-6 px-1 space-y-4"
    >
      <CommonInput
        hForm={createEmailForm}
        label="email name"
        name="name"
        showError
        placeholder="Enter the email name"
        registerOptions={{
          required: "Email name is required",
          minLength: {
            value: 3,
            message: "Email name should have 3 character at least",
          },
          maxLength: {
            value: 30,
            message: "Email name should have 30 character at most",
          },
        }}
        inputClassName="rounded-md"
      />
      <CommonInput
        hForm={createEmailForm}
        label="subject"
        name="subject"
        showError
        placeholder="Enter the Subject"
        registerOptions={{
          required: "Subject is required",
          minLength: {
            value: 4,
            message: "Subject should have 4 character at least",
          },
          maxLength: {
            value: 50,
            message: "Subject  should have 50 character at most",
          },
        }}
        inputClassName="rounded-md"
      />

      <CommonTextArea
        hForm={createEmailForm}
        label="email body"
        name="body"
        placeholder="Enter email body"
        registerOptions={{
          required: "Email body is required",
          minLength: {
            value: 40,
            message: "Email body need to be at least 40 characters",
          },
          maxLength: {
            value: 2500,
            message: "Summary needs to be at most 2500 characters",
          },
        }}
        inputClassName="rounded-md"
      />

      <Button type="submit" className="w-full group mt-10">
        <Plus
          strokeWidth={3}
          className="group-hover:scale-125 transition-transform duration-200 ease-in-out"
        />
        Create Email Template
      </Button>
    </form>
  );
};

export default CreateEmailTemplate;
