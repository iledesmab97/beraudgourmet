"use client";

import { styled } from "@mui/system";
import {
    AppBar,
    Toolbar,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Box,
} from "@mui/material";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Image from "next/image";
import CurrentSession from "@/components/CurrentSession/CurrentSession";
import NavBar from "@/components/NavBar/NavBar";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import logoBeraund from "../../public/images/homeimg/homeimgberaud/logoBeraud.png";
import links from "../NavBar/navbarpaths.json";
import { scrollToSection } from "@/utils/moveIntoPage";
import { useTheme, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";

const navImage = {
    Pizzas: <LocalPizzaIcon />,
};

function getSubNav(currentPath) {
    const route = links.filter((route) => {
        return route.path === currentPath;
    })[0];
    if (route) return route.subNav;
    return [];
}

const ElegantButton = styled(Button)(({ theme }) => ({
    borderRadius: 0,
    padding: theme.spacing(1, 4),
    transition: "background-color 0.3s",
    "&:hover": {
        backgroundColor: theme.palette.primary.light,
    },
}));

function Header() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const pathname = usePathname();
    const [subNav, setSubNav] = useState(getSubNav(pathname));
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        handleSubNav(getSubNav(pathname));
    }, [pathname]);

    function handleSubNav(newSubNav) {
        setSubNav(newSubNav);
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            id="header-container"
            color="default"
            sx={{ position: "relative" }}
        >
            <Container maxWidth="lg">
                <Toolbar
                    sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Link href={"/"}>
                        <Image
                            src={logoBeraund}
                            alt={"logoBeraund"}
                            width={130}
                        />
                    </Link>
                    {isMobile ? (
                        <Box>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleMenu}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <Link href="/" passHref>
                                    <MenuItem component="a">Inicio</MenuItem>
                                </Link>
                                <Link href="/menu" passHref>
                                    <MenuItem component="a">Menús</MenuItem>
                                </Link>
                                <Link href="/about" passHref>
                                    <MenuItem component="a">Eventos</MenuItem>
                                </Link>
                                {/* <MenuItem
                                    onClick={() =>
                                        handleNavigation("/contacto")
                                    }
                                >
                                    Contacto
                                </MenuItem> */}
                            </Menu>
                        </Box>
                    ) : (
                        <>
                            {/* <Link href="/menu">
                                <ElegantButton color="inherit">
                                    Menús
                                </ElegantButton>
                            </Link>
                            <Link href="/about">
                                <ElegantButton color="inherit">
                                    Eventos
                                </ElegantButton>
                            </Link> */}
                            {/* <Link href="/contacto" passHref>
                                <ElegantButton color="inherit" component="a">
                                    Contacto
                                </ElegantButton>
                            </Link> */}
                        </>
                    )}
                    <CurrentSession />
                </Toolbar>
                <NavBar />
            </Container>
        </AppBar>
    );
}

export default Header;
