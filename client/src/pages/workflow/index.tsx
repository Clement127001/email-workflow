import Link from "next/link";
import WorkflowList from "@/components/features/workflow/WorkflowList";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const WorkflowListPage = () => {
  return (
    <Layout>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Workflow</h1>
        <Link href={"/workflow/create"}>
          <Button>Create Workflow</Button>
        </Link>
      </div>
      <WorkflowList />
    </Layout>
  );
};

export default WorkflowListPage;
