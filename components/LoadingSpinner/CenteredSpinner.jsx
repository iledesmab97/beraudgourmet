import { Grid } from "@mui/material";
import React from "react";
import { Oval } from "react-loader-spinner";

const CenteredSpinner = () => {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ height: "100vh", width: "100vw" }}
        >
            <Oval
                height={80}
                width={80}
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
