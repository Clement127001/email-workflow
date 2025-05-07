import BackButton from "@/components/BackButton";
import CreateWorkflow from "@/components/features/workflow/CreateWorkflow";
import Layout from "@/components/layout/Layout";

const CreateWorkflowPage = () => {
  return (
    <Layout>
      <BackButton />
      <CreateWorkflow />
    </Layout>
  );
};

export default CreateWorkflowPage;
