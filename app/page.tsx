"use client";

import Image from "next/image";
import {
    Typography,
    Button,
    Container,
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material";
import Link from "next/link";
import StoreComponent from "./StoreComponent";
import { styled } from "@mui/system";
import ServiciosEstaticos from "./Servicios";
import CenteredSpinner from "@/components/LoadingComponets/CenteredSpinner";

import { Restaurant, EventAvailable } from "@mui/icons-material";
import logoBeraund from "../public/images/homeimg/homeimgberaud/logoBeraud.png";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getAllCompanies } from "@/services/companyApi"

const ServiceCard = styled(Card)(({ theme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    "&:hover": {
        transform: "translateY(-5px)",
        boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    },
}));

export default function Home() {

    const [companieList, setCompanieList] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

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
                <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
                    <Box sx={{ textAlign: "center", mb: 8 }}>
                        <Typography
                            variant="h2"
                            component="h1"
                            gutterBottom
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
                        {/* <Typography
                            variant="h5"
                            component="h2"
                            gutterBottom
                            color="secondary"
                            sx={{
                                fontSize: {
                                    xs: "1rem",
                                    sm: "1.25rem",
                                    md: "1.5rem",
                                    lg: "2rem",
                                    xl: "2.5rem",
                                },
                                textAlign: "center",
                            }}
                        >
                            Experiencia culinaria francesa a su servicio
                        </Typography> */}
                    </Box>

                    <Grid container spacing={4} justifyContent={"center"}>
                        {
                            loading ? (
                                <Grid
                                    item
                                    xs={12}
                                    // sx={{
                                    //     width: '100%',
                                    //     height: '300px'
                                    // }}
                                >
                                    <CenteredSpinner/>
                                </Grid>
                            ) : companieList.map((company: any) => (
                                    <Grid item xs={12} md={6}>
                                        <ServiceCard
                                            onClick={() => { router.push(company.name)}}
                                            sx={{
                                                cursor: "pointer"
                                            }}
                                        >
                                            <CardMedia
                                                component="div"
                                                sx={{
                                                    position: "relative",
                                                    height: 140,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: "white",
                                                }}
                                            >
                                                <Image
                                                    src={logoBeraund}
                                                    alt={"logoBeraud"}
                                                    fill
                                                />
                                            </CardMedia>
                                            <CardContent
                                                sx={{
                                                    bgcolor: "primary.main"
                                                }}
                                            >
                                                <Typography
                                                    gutterBottom
                                                    variant="h5"
                                                    component="div"
                                                    // color="primary"
                                                    color="white"
                                                >
                                                    {company.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    // color="text.secondary"
                                                    color="white"
                                                >
                                                    {company.text}
                                                </Typography>
                                                {/* <Box sx={{ mt: 2 }}>
                                                    <Link href={"/" + company.name}>
                                                        <Button
                                                            variant="outlined"
                                                            sx={{
                                                                color: "white",
                                                                borderColor: "white",
                                                                "&:hover": {
                                                                    backgroundColor: "white",
                                                                    color: "#295386"
                                                                }
                                                            }}
                                                        >
                                                            Ver Menús
                                                        </Button>
                                                    </Link>
                                                </Box> */}
                                            </CardContent>
                                        </ServiceCard>
                                    </Grid>
                                ))
                        }
                    </Grid>
                </Container>
                <ServiciosEstaticos />
            </Box>
        </>
    );
}
