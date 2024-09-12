"use client";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import PlaceIcon from "@mui/icons-material/Place";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CircleIcon from "@mui/icons-material/Circle";

import MoveDown from "@/components/MoveDown/MoveDown";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function DetailStore({ currentStore }) {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <Grid
            id={"DetailStore-container"}
            item
            sm={8}
            pr={1}
            sx={{
                height: {
                    xs: "fit-content",
                    sm: "100%",
                },
                overflowY: {
                    sm: "auto",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                }}
            >
                <Typography variant="title">{currentStore.name}</Typography>
                <List>
                    <ListItem
                        component={"li"}
                        sx={{
                            display: "flex",
                        }}
                    >
                        <CircleIcon
                            color={currentStore.open ? "primary" : "error"}
                            sx={{
                                mr: "8px",
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                            }}
                        >
                            <Typography component={"span"}>
                                {currentStore.open ? "Abierto" : "Cerrado"}
                            </Typography>
                            <Typography>
                                {currentStore.openTime === ""
                                    ? `Hoy no laboramos. Puede hacer pedido para otro día.`
                                    : `Abrimos a las ${currentStore.openTime}. ¡Bienvenidos!`}
                            </Typography>
                        </Box>
                    </ListItem>
                    <ListItem
                        component={"li"}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <PlaceIcon sx={{ mt: "8px", mr: "8px" }} />

                        <ListItemText
                            primary="Dirección"
                            secondary={
                                <>
                                    <Typography
                                        sx={{ display: "inline" }}
                                        component={"span"}
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {currentStore.place}
                                    </Typography>
                                </>
                            }
                        />
                    </ListItem>
                    <ListItem
                        component={"li"}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <LocalPhoneIcon sx={{ mt: "8px", mr: "8px" }} />

                        <ListItemText
                            primary="Telefono"
                            secondary={
                                <>
                                    <Typography
                                        sx={{ display: "inline" }}
                                        component={"span"}
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {currentStore.phone}
                                    </Typography>
                                </>
                            }
                        />
                    </ListItem>
                </List>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "8px",
                    }}
                >
                    <Typography
                        variant="title"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <AccessTimeIcon />
                        Horario para recoger
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                {currentStore.pickupSchedule.pickupSchedule.map(
                                    (hour) => (
                                        <TableRow key={hour.days + hour.hours}>
                                            <TableCell>{hour.days}</TableCell>
                                            <TableCell>{hour.hours}</TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography
                        id={"DetailStore-title-Horario_Entrega"}
                        variant="title"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <AccessTimeIcon />
                        Horario de entrega
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                {currentStore.deliverySchedule.deliverySchedule.map(
                                    (hour) => (
                                        <TableRow key={hour.days + hour.hours}>
                                            <TableCell>{hour.days}</TableCell>
                                            <TableCell>{hour.hours}</TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
            <MoveDown
                sectionToGo={"#DetailStore-title-Horario_Entrega"}
                containerId={
                    isLargeScreen
                        ? "#DetailStore-container"
                        : "#ModalStoresDetail-container"
                }
            />
        </Grid>
    );
}
