import RegisterForm from "@/components/features/auth/register/RegisterForm";
import Head from "next/head";
import Link from "next/link";

export default function Register() {
  return (
    <>
      <Head>
        <title>Demo app 2</title>
        <meta name="description" content="Register page for user" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center h-screen">
        <section className="bg-white min-w-[400px] rounded-md p-4 px-6 shadow-lg border-[1px] space-y-8">
          <h2 className="text-center text-3xl font-bold">Register</h2>
          <RegisterForm />

          <p style={{ display: "flex" }}>
            Already had account?{" "}
            <Link
              href={"/login"}
              className="text-app-primary-700 ml-2 font-semibold"
            >
              Login
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}
