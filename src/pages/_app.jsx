
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Router from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  // Router.onRouteChangeStart = (url) => {
  //   console.log("hey")
  // };

  // Router.onRouteChangeComplete = (url) => {
  //   console.log("completed")
  // };

  // Router.onRouteChangeError = (err, url) => {
  //   console.log("error..")
  // };

  return (
    <SessionProvider session={session}>
      <MantineProvider
        theme={{
          colorScheme: "light",
          primaryColor: "mainBlue",
          colors: {
            text: [
              "#adadad",
              "#999999",
              "#858585",
              "#707070",
              "#5c5c5c",
              "#474747",
              "#333333",
              "#2e2e2e",
              "#292929",
              "#242424",
              "#1f1f1f",
              "#1a1a1a",
            ],
            mainBlue: [
              "#cef0ef",
              "#b5e8e6",
              "#9ce1de",
              "#84d9d6",
              "#39c2bd",
              "#21bbb5",
              "#08b3ad",
              "#07a19c",
              "#068f8a",
              "#067d79",
              "#056b68",
              "#045a57",
            ],
            info: [
              "#fff6d7",
              "#fff4cd",
              "#fff2c2",
              "#fff0b8",
              "#ffedae",
              "#ffeba4",
              "#ffe99a",
              "#e6d28b",
              "#ccba7b",
              "#b3a36c",
              "#998c5c",
              "#80754d",
            ],
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
    </SessionProvider>
  );
}
