import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { useRouter } from "next/navigation";

export default function CompanyCard({ company }) {

    const router = useRouter()

    return (
        <CardActionArea
            onClick={() => { router.push(company.name)}}
            sx={{
                backgroundColor: "transparent",
                overflow: "visible",
                boxShadow: "none",
                cursor: "pointer",
                borderRadius: 1
            }}
        >
            <CardMedia
                component="img"
                image={company.url}
                alt={company.name}
                sx={{
                    height: {
                        xs: "250px"
                    },
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
                    pl: {
                        xs: 1,
                        md: 2
                    }
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
                        height: "17px",
                        p: 0,
                        color: "#295386",
                        overflow: "hidden"
                    }}
                >
                    {company.text}
                </Typography>
            </CardContent>
        </CardActionArea>
    )
}