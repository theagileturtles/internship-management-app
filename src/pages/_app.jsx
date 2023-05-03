import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider
      theme={{
        colorScheme: "light",
        primaryColor: "mainBlue",
        colors: {
          mainBlue: [
            '#cef0ef',
            '#b5e8e6',
            '#9ce1de',
            '#84d9d6',
            '#39c2bd',
            '#21bbb5',
            '#08b3ad',
          ],
          mainLightBlue: ["#dbf4f3"],
          mainHoverBlue: ["#06A09A"],
        },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
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
