import { useEffect, useState } from "react";
import { baseApiUrl } from "@/utils/common";
import { WorkflowData } from "@/types/workflow";
import Cookies from "js-cookie";

export const useWorkflowData = () => {
  const [workflowList, setWorkflowList] = useState<WorkflowData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkflowData = async () => {
    setIsLoading(true);
    const workflowListUrl = `${baseApiUrl}/workflow/`;

    const userToken = Cookies.get("userToken");
    const response = await fetch(workflowListUrl, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();

      const transformedData: WorkflowData[] = data.map((item: any) => {
        const { name, _id, createdAt } = item;
        return { name, id: _id, createdAt };
      });

      setWorkflowList(transformedData);
      setIsLoading(false);
      setError(null);
    } else {
      const data = await response.json();
      setError(data.error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkflowData();
  }, []);

  return { isLoading, error, workflowList, fetchWorkflowData };
};
