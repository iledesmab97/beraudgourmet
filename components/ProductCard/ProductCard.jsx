import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import useGetModal from "@/hooks/useGetModal";

export default function ProductCard({ product }) {

    const { handleOpenModalOrder } = useGetModal({ modalType: "order" });

    return (
        <CardActionArea
            onClick={() => {
                handleOpenModalOrder({ product });
            }}
            sx={{
                height: "100%",
            }}
        >
            <Card
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{
                        width: "auto",
                        height: "194px",
                        objectFit: "contain",
                        mt: "16px",
                        mx: "8px",
                    }}
                >
                </CardMedia>
                <CardContent
                    sx={{
                        flexGrow: 1
                    }}
                >
                    <Typography
                        gutterBottom
                        variant="title"
                        component="h2"
                        sx={{
                            fontSize: {
                                xs: "1.5rem",
                                sm: "1.2rem",
                            },
                        }}
                    >
                        {product.name}
                    </Typography>
                        <Box
                            sx={{
                                height: "60px",
                                overflow: "hidden",
                                position: "relative",
                            }}
                        >
                            <Typography
                                component={"p"}
                                variant="texto"
                            >
                                {product.text}
                            </Typography>
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: "0px",
                                    left: "0px",
                                    width: "100%",
                                    height: "100%",
                                    background:
                                        "linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))",
                                }}
                            />
                        </Box>
                </CardContent>
            </Card>
        </CardActionArea>
    )
}