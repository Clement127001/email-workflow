import { Fragment, useState } from "react";
import { PlayCircle } from "lucide-react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import ErrorMessage from "@/components/ErrorMessage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableWithCardSkeleton from "@/components/TableWithCardSkeleton";
import { useWorkflowData } from "@/hooks/useWorkflowData";
import { baseApiUrl } from "@/utils/common";

const WorkflowList = () => {
  const { workflowList, isLoading, error } = useWorkflowData();
  const [executingId, setExecutingId] = useState<string | null>(null);

  if (isLoading) return <TableWithCardSkeleton />;
  if (error) return <ErrorMessage error={error} redirectLink="/" />;

  const showWorkflowList =
    workflowList && Array.isArray(workflowList) && workflowList.length > 0;

  const handleExecuteWorkFlow = async (id: string) => {
    if (executingId) return;
    setExecutingId((_) => id);

    try {
      const userToken = Cookies.get("userToken");
      const response = await fetch(`${baseApiUrl}/workflow/${id}/execute`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        toast.success("Success", {
          description: "Workflow executed successfully",
          duration: 2000,
          action: {
            label: "close",
            onClick: () => {},
          },
        });
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
    } catch (err) {
      toast.error("Error", {
        description: "Failed to create email template",
        duration: 2000,
        action: {
          label: "close",
          onClick: () => {},
        },
      });
    } finally {
      setExecutingId((_) => null);
    }
  };

  return (
    <div>
      <Table className="w-full text-left">
        <TableHeader className="bg-[#E2E8F0] text-[16px]">
          <TableRow>
            <TableHead className="min-w-[300px] px-8 rounded-l-[10px] py-4 flex-shrink-0">
              S.NO
            </TableHead>
            <TableHead className="min-w-[300px] px-8 py-4 flex-shrink-0">
              Workflow Title
            </TableHead>
            <TableHead className="min-w-[140px]">Date Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        {showWorkflowList && (
          <TableBody>
            <TableRow className="h-6 border-t-0 border-b-0" />

            {workflowList.map((workflow, index) => {
              const { id, name, createdAt } = workflow;

              const modifiedDate = new Date(createdAt).toLocaleString();

              const isExecuting = executingId && executingId === id;

              return (
                <Fragment key={id}>
                  <TableRow className="text-[16px] font-normal hover:bg-gray-100">
                    <TableCell className="px-4 text-[#110F43]">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <p className="line-clamp-1">{name}</p>
                    </TableCell>
                    <TableCell>
                      <p className="line-clamp-1">{modifiedDate}</p>
                    </TableCell>

                    <TableCell>
                      <button
                        onClick={() => handleExecuteWorkFlow(id)}
                        disabled={Boolean(isExecuting)}
                        className="disabled:cursor-not-allowed"
                      >
                        {isExecuting ? (
                          <div className="w-6 h-6 border-[3px] border-app-primary-700 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <PlayCircle />
                        )}
                      </button>
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        )}
      </Table>

      {!showWorkflowList && (
        <p className="w-full text-center font-medium text-app-accent-error-500 py-10">
          No workflow found
        </p>
      )}
    </div>
  );
};

export default WorkflowList;
