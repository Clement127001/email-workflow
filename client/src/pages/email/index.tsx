import EmailList from "@/components/features/email/EmailList";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EmailListPage = () => {
  return (
    <Layout>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Email Template</h1>
        <Button>
          <Link href={"/email/create"}>Create Email</Link>
        </Button>
      </div>
      <EmailList />
    </Layout>
  );
};

export default EmailListPage;
