"use client";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

import Carousel from "@/components/Carousel/Carousel";
import ProductCard from "@/components/ProductCard/ProductCard"

import { useTheme, useMediaQuery } from "@mui/material";

const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <IconButton
            style={{
                display: "block",
                position: "absolute",
                top: "88%",
                right: "30%",
                transform: "translateX(50%)",
            }}
            onClick={onClick}
        >
            <ArrowForward />
        </IconButton>
    );
};

const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <IconButton
            style={{
                display: "block",
                position: "absolute",
                top: "88%",
                left: "30%",
                transform: "translateX(-50%)",
                zIndex: 1,
            }}
            onClick={onClick}
        >
            <ArrowBack />
        </IconButton>
    );
};
function ContainerItems({ itemList, title, sectionId }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
                                
    return (
        <Grid id={sectionId} item xs={12}>
            <Typography
                component={"h1"}
                variant="encabezado"
                sx={{
                    width: {
                        xs: "244px",
                        sm: "100%",
                    },
                    mb: "16px",
                    fontSize: {
                        xs: "2.0rem",
                        sm: "2.8rem",
                    },
                }}
            >
                {title}
            </Typography>
            {isSmallScreen ? (
                <Carousel
                    nItems={itemList.length}
                    settings={{
                        // dots: true,
                        arrows: itemList.length > 1,
                        nextArrow: <NextArrow />,
                        prevArrow: <PrevArrow />,
                    }}
                >
                    {
                        itemList.map(product => (
                            <Box
                                key={product.productType + product.id}
                                sx={{
                                    p: 1
                                }}
                            >
                                <ProductCard
                                    product={product}
                                />
                            </Box>
                        ))
                    }
                </Carousel>
            ) : (
                <Grid container spacing={2}>
                    {itemList.map((item, index) => (
                        <Grid item key={item.name + index} xs={12} sm={4}>
                            <ProductCard product={item} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Grid>
    );
}

export default ContainerItems;
