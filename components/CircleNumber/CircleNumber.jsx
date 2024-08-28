import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import CircleIcon from "@mui/icons-material/Circle";

function CircleNumber({ number, color, ...rest }) {
    return (
        <Box {...rest}>
            <CircleIcon sx={{ color: color ? color : "#00000042" }} />
            <Typography
                component={"span"}
                color={"white"}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                {number}
            </Typography>
        </Box>
    );
}

export default CircleNumber;
