import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Slider from "react-slick";

import { useTheme, useMediaQuery } from "@mui/material";

import { useRouter } from "next/navigation";

import { styled } from "@mui/system";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CompaniesCarousel.css"

const ServiceCard = styled(Card)(({ theme }) => ({
    height: "100%",
    // transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    // "&:hover": {
    //     transform: "translateY(-5px)",
    //     boxShadow:
    //         "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    // },
}));

const smallScreen = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: true
}

function getSettings({ screen, nCompanies }) {
    switch(screen) {
        case "small": {
            let newScreen = {...smallScreen}
            newScreen.dots = false
            if (nCompanies < 4) {
                newScreen.infinite = false
            }
            return newScreen
        }
        default: {
            let newScreen = {...smallScreen}
            if (nCompanies < 4) {
                newScreen.infinite = false
            }
            return newScreen
        }
    }
}

export default function CompaniesCarousel({ companies }) {
    
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const router = useRouter()

    const settings = getSettings({ screen: isSmallScreen ? "small" : "medium", nCompanies: companies.length })

  return (
    <Slider {...settings}>
        {
            companies.filter(company => company.available).map(( company ) => (
                <Box
                    key={company.name + company.id}
                >
                    <ServiceCard
                        onClick={() => { router.push(company.name)}}
                        sx={{
                            m: 1,
                            backgroundColor: "transparent",
                            overflow: "visible",
                            boxShadow: "none",
                            cursor: "pointer"
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={company.url}
                            alt={company.name}
                            sx={{
                                height: "150px",
                                width: "100%",
                                padding: 2,
                                objectFit: "contain",
                                borderRadius: "8px",
                                boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
                                backgroundColor: "white"
                            }}
                        >
                        </CardMedia>
                        <CardContent
                            sx={{
                                pl: 0
                            }}
                        >
                            <Typography
                                variant="title"
                                component="h3"
                            >
                                {company.title}
                            </Typography>
                            <Typography
                                component={"p"}
                                variant="p"
                                sx={{
                                    height: "16px",
                                    p: 0,
                                    color: "#295386",
                                    overflow: "hidden"
                                }}
                            >
                                {company.text}
                            </Typography>
                        </CardContent>
                    </ServiceCard>
                </Box>
            ))
        }
    </Slider>
  );
}