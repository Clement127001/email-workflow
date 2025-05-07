import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { UseLogin } from "@/context/LoginProvider";
import Link from "next/link";

const Home = () => {
  const { isLoggedIn } = UseLogin();

  return (
    <Layout>
      <div className="space-y-5">
        <h1 className="text-2xl font-semibold">Add your workflow now</h1>

        <p className="max-w-[500px] leading-6 tracking-wide">
          {`Welcome! Start by creating email templates, then build workflows by
          dragging in nodes like delays and emails. Once you're done, run a
          workflow to see it in action!`}
        </p>

        <div className="flex gap-10">
          <div className="space-y-2">
            <p className="font-semibold text-lg">Explore emails</p>
            <Link href={isLoggedIn ? "/email" : "/login?ua=true"}>
              <Button>All Emails</Button>
            </Link>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-lg">Explore Workflows</p>
            <Link href={isLoggedIn ? "/workflow" : "/login?ua=true"}>
              <Button>All Workflows</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
