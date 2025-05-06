import BackButton from "@/components/BackButton";
import CreateWorkflow from "@/components/features/workflow/CreateWorkflow";
import Layout from "@/components/layout/Layout";

const CreateWorkflowPage = () => {
  return (
    <Layout>
      <BackButton />
      <h1 className="text-2xl font-semibold">Create your workflow</h1>
      <CreateWorkflow />
    </Layout>
  );
};

export default CreateWorkflowPage;
