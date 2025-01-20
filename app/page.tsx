"use client";

import {
    Typography,
    Container,
    Box,
    Grid,
} from "@mui/material";
import StoreComponent from "./StoreComponent";
import ServiciosEstaticos from "./Servicios";
import CenteredSpinner from "@/components/LoadingComponets/CenteredSpinner";
import CompaniesCarousel from "@/components/CompaniesCarousel/CompaniesCarousel"

import { Restaurant, EventAvailable } from "@mui/icons-material";

import React, { useEffect, useState } from "react";

import { getAllCompanies } from "@/services/companyApi"

export default function Home() {

    const [companieList, setCompanieList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCompanies()
    }, [])

    async function getCompanies() {
        try {
            setLoading(true)
            const newCompanyList = await getAllCompanies({ available: true })
            setCompanieList(newCompanyList)
        } catch(error: any) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <StoreComponent />
            <Box
                sx={{
                    flexGrow: 1,
                    bgcolor: "background.default",
                    minHeight: "100vh",
                }}
            >
                <Container
                    maxWidth="lg"
                    sx={{
                        mt: 8,
                        mb: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"

                    }}
                >
                    <Box sx={{ textAlign: "center", mb: 8 }}>
                        <Typography
                            variant="h2"
                            component="h1"
                            // gutterBottom
                            color="primary"
                            sx={{
                                fontSize: {
                                    xs: "2rem",
                                    sm: "3rem",
                                    md: "3.5rem",
                                    lg: "4rem",
                                    xl: "5rem",
                                },
                                textAlign: "center",
                            }}
                        >
                            Tiendas Disponibles
                        </Typography>
                    </Box>

                    {
                        !loading ? (
                            <Box
                                sx={{
                                    width: "100%"
                                }}
                            >
                                <CompaniesCarousel companies={companieList}/>
                            </Box>
                        ) : null
                    }

                    <Grid
                        container
                        spacing={4}
                        justifyContent={"center"}
                        sx={{
                            width: "100%",
                            height: "100px"
                        }}
                    >
                        {
                            loading ? (
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <CenteredSpinner/>
                                </Grid>
                            ) : null
                        }
                    </Grid>
                </Container>
                <ServiciosEstaticos />
            </Box>
        </>
    );
}
