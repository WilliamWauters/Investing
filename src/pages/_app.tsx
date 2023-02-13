import Drawer from "@/components/navigation/Drawer";
import "@/styles/globals.css";
import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { Box, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  Component: any;
  emotionCache?: EmotionCache;
  pageProps: any;
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md">
          <Box borderColor="primary.main" sx={{ height: "100vh" }}>
            <Component {...pageProps} />
            <Drawer />
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
