import { Grid } from "@mui/material";
import React from "react";
import { Oval } from "react-loader-spinner";

const CenteredSpinner = ({ height = "80px", width = "80px" }) => {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ height: "100%", width: "100%" }}
        >
            <Oval
                height={height}
                width={width}
                color="#295386"
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4e5762"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </Grid>
    );
};

export default CenteredSpinner;
