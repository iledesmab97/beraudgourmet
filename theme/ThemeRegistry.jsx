"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
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


const themeOptions = {
  // breakpoints: {
  //   values: {
  //     phone: 600,
  //     computer: 1000
  //   }
  // },
  typography: {
    fontFamily,
    encabezado: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      color: "#295386",
      fontSize: "2.8rem",
    },
    title: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      color: "#4e5762",
      fontSize: "1.2rem",
    },
    p: {
      fontFamily: "Montserrat",
      fontWeight: 400,
      lineHeight: 1,
      padding: 9,
      fontSize: "1rem",
      // "@media (min-width:320px)": {
      //   fontSize: "1.4rem",
      // },
      // "@media (min-width:480px)": {
      //   fontSize: "1.6rem",
      // },
      // "@media (min-width:600px)": {
      //   fontSize: "1.8rem",
      // },
      // "@media (min-width:801px)": {
      //   fontSize: "2.0rem",
      // },
      // "@media (min-width:1025px)": {
      //   fontSize: "2.2rem",
      // },
    },
    miniature: {
      fontFamily: "Montserrat",
      fontWeight: 300,
      lineHeight: 1,
      padding: 9,
      fontSize: "0.8rem",
    }
  },
  components: {
    // MuiTextField: {
    //   variants: [
    //    {
    //     props: {
    //       variant: 'standard'
    //     },
    //     style: {
    //       root: {
    //         borderRadius: "4px",
    //       },
    //       input: {
    //         width: "242px",
    //         fontSize: "1.8rem",
    //         fontFamily: "inherit",
    //         border: "none",
    //         backgroundColor: "#CCC",
    //         borderRadius: "2px",
    //         boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
    //       },
    //     }
    //    } 
    //   ],
    // },
    MuiGrid: {
      variants: [
       {
        props: {
          variant: 'modal'
        },
        styleOverrides: {
          root: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: 0,
            marginLeft: 0,
            padding: 4,
            paddingBottom: 0,
            paddingRight: 0,
            transform: 'translate(-50%, -50%)',
            height: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 5,
            overflow: 'hidden'
          }
        }
       } 
      ],
    }
  },
  palette: {
    primary: {
      main: "#295386",
    },
    secondary: {
      main: "#4e5762",
    },
    default: {
      main: "#FFFFFF"
    },
    // import { makeStyles } from "@material-ui/core/styles";

    // const useStyles = makeStyles((theme) => ({
    //   customAppBar: {
    //     backgroundColor: theme.palette.colors.customColor1,
    //   },
    // }));
    
    // function UseColors() {
    //   const classes = useStyles();
    //   return ();
    // }
    // colors: {
    //   customColor1: "#FFA500",
    // },
  },
};


const theme = createTheme( themeOptions );

export default function ThemeRegistry({
  children,
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
