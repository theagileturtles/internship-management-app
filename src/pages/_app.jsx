import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider theme={{colors:{"mainBlue":["#08b3ad"], "mainLightBlue":["#dbf4f3"]}}} withGlobalStyles withNormalizeCSS>
      <Head>
        <title>Internship Management App</title>
        <meta
          name="description"
          content="Internship Management Application which is developed by Agile Turtles"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
