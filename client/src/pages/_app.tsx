import type { AppProps } from "next/app";
import Head from "next/head";
import { PageLoaderProvider } from "@/context/pageLoaderProvider";
import "@/styles/globals.css";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Email Workflow</title>
        <meta
          name="description"
          content="Welcome! Start by creating email templates, then build workflows by
          dragging in nodes like delays and emails. Once you're done, run a
          workflow to see it in action!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Toaster />
      <PageLoaderProvider>
        <Component {...pageProps} />
      </PageLoaderProvider>
    </>
  );
}
