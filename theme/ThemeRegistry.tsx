"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createStyles, createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";

const fontFamily = "Amiri, Montserrat";

const mediaQueries = {
  "@media (min-width:320px)": {
    fontSize: "2.4rem",
  },
  "@media (min-width:480px)": {
    fontSize: "2.6rem",
  },
  "@media (min-width:600px)": {
    fontSize: "2.8rem",
  },
  "@media (min-width:801px)": {
    fontSize: "3.0rem",
  },
  "@media (min-width:1025px)": {
    fontSize: "3.2rem",
  },
};


const themeOptions: ThemeOptions = {
  typography: {
    fontFamily,
  },
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#4e5762",
    },

  },

};

const theme = createTheme(themeOptions);

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
