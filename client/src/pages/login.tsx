import Head from "next/head";
import Link from "next/link";
import LoginForm from "@/components/features/auth/login/LoginForm";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const query = router.query;

  const isUnauthorized = String(query.ua ?? "");
  const path = router.pathname;

  useEffect(() => {
    if (!router.isReady || !isUnauthorized) return;

    if (isUnauthorized === "true") {
      toast.warning("Unauthorized", {
        description: "Please login to view the page",
        duration: 2000,
        action: {
          label: "close",
          onClick: () => {
            {
            }
          },
        },
      });
    } else {
      toast.success("Logged out", {
        description: "Logged out successfully",
        duration: 2000,
        action: {
          label: "close",
          onClick: () => {
            {
            }
          },
        },
      });
    }

    delete query.ua;
    router.replace(path, undefined, { shallow: true });
  }, [router.isReady, isUnauthorized, query]);

  return (
    <>
      <Head>
        <title>Demo app 2</title>
        <meta name="description" content="Login page for user" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center h-screen">
        <section className="bg-white min-w-[400px] rounded-md p-4 px-6 shadow-lg border-[1px] space-y-8">
          <h2 className="text-center text-3xl font-bold">Login</h2>
          <LoginForm />

          <p style={{ display: "flex" }}>
            Don't have account?{" "}
            <Link
              href={"/register"}
              className="text-app-primary-700 ml-2 font-semibold"
            >
              register
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}
