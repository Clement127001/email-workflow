import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <Layout>
      <div className="space-y-5">
        <h1 className="text-2xl font-semibold">Add your workflow now</h1>

        <p className="max-w-[500px] leading-6 tracking-wide">
          Welcome! Start by creating email templates, then build workflows by
          dragging in nodes like delays and emails. Once you're done, run a
          workflow to see it in action!
        </p>

        <div className="flex gap-10">
          <div className="space-y-2">
            <p className="font-semibold text-lg">Explore emails</p>
            <Button>
              <Link href={"/email"}>All Emails</Link>
            </Button>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-lg">Explore Workflows</p>
            <Button>
              <Link href={"/workflow"}>All Workflows</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
