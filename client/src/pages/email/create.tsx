import BackButton from "@/components/BackButton";
import CreateEmailTemplate from "@/components/features/email/CreateEmailTemplate";
import Layout from "@/components/layout/Layout";

const CreateEmailPage = () => {
  return (
    <Layout>
      <BackButton />
      <CreateEmailTemplate />
    </Layout>
  );
};

export default CreateEmailPage;
