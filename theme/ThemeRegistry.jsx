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
        },
        footer_title: {
            fontFamily: "Montserrat",
            fontWeight: 700,
            lineHeight: 1.5,
            padding: 9,
            fontSize: "1rem",
            color: "white",
        },
        footer_text_link: {
            fontFamily: "Montserrat",
            fontWeight: 300,
            lineHeight: 1,
            padding: 9,
            fontSize: "0.9rem",
            color: "#EAEDF2",
            "&:hover": {
                textDecoration: "underline",
            },
        },
        footer_text: {
            fontFamily: "Montserrat",
            fontWeight: 300,
            lineHeight: 1,
            padding: 9,
            fontSize: "0.9rem",
            color: "#EAEDF2",
        },
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
                        variant: "modal",
                    },
                    styleOverrides: {
                        root: {
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            marginTop: 0,
                            marginLeft: 0,
                            padding: 4,
                            paddingBottom: 0,
                            paddingRight: 0,
                            transform: "translate(-50%, -50%)",
                            height: 600,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            borderRadius: 5,
                            overflow: "hidden",
                        },
                    },
                },
            ],
        },
    },
    palette: {
        primary: {
            main: "#295386", // Main primary color
            light: "#5b7fae", // Lighter shade of primary
            dark: "#1c3c5a", // Darker shade of primary
            contrastText: "#FFFFFF", // Text color that contrasts with primary main
        },
        secondary: {
            main: "#4e5762", // Main secondary color
            light: "#777f8a", // Lighter shade of secondary
            dark: "#2e363e", // Darker shade of secondary
            contrastText: "#FFFFFF", // Text color that contrasts with secondary main
        },
        default: {
            main: "#FFFFFF", // Main default color
            light: "#f4f4f4", // Lighter shade of default
            dark: "#d9d9d9", // Darker shade of default
            contrastText: "#000000", // Text color that contrasts with default main
        },
        error: {
            main: "#f44336", // Main error color
            light: "#e57373", // Lighter shade of error
            dark: "#d32f2f", // Darker shade of error
            contrastText: "#FFFFFF", // Text color that contrasts with error main
        },
        text: {
            primary: "#000000", // Primary text color
            secondary: "#4e5762", // Secondary text color
            disabled: "#BDBDBD", // Disabled text color
        },
        background: {
            paper: "#FFFFFF", // Background color for paper elements
            default: "#F5F5F5", // Default background color
        },
        action: {
            active: "#4e5762", // Color for active actions
            hover: "#f5f5f5", // Color when an action is hovered over
            selected: "#e0e0e0", // Color when an action is selected
            disabled: "#bdbdbd", // Color when an action is disabled
            disabledBackground: "#e0e0e0", // Background color when an action is disabled
        },
    },
};

const theme = createTheme(themeOptions);

export default function ThemeRegistry({ children }) {
    return (
        <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
    );
}
