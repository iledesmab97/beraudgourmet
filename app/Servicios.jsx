"use client";
import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EventIcon from "@mui/icons-material/Event";
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining";
import CoffeeIcon from "@mui/icons-material/Coffee";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/system";

const IconWrapper = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    borderRadius: "50%",
    width: 60,
    height: 60,
    justifyContent: "center",
}));

const LabelWrapper = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(1),
    fontSize: "0.875rem",
    fontWeight: 500,
}));

const items = [
    { icon: LocalShippingIcon, label: "Delivery" },
    { icon: EventIcon, label: "Eventos" },
    { icon: TakeoutDiningIcon, label: "BoxLunch" },
    { icon: CoffeeIcon, label: "CoffeeBreak" },
    { icon: FavoriteIcon, label: "Bodas" },
];

export default function ServiciosEstaticos() {
    return (
        <Box
            sx={{
                flexGrow: 1,
                p: 2,
                bgcolor: "grey.100",
                borderRadius: 2,
            }}
        >
            <Grid container spacing={12} justifyContent="center">
                {items.map(({ icon: Icon, label }) => (
                    <Grid item key={label}>
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                        >
                            <IconWrapper elevation={2}>
                                <Icon color="primary" />
                            </IconWrapper>
                            <LabelWrapper
                                variant="body2"
                                color="text.secondary"
                            >
                                {label}
                            </LabelWrapper>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
