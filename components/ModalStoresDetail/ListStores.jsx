"use client";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";

function ListStores({ handleCurrentStoreDetail, place }) {
    const { stores, status, error } = useSelector((state) => state.storeList);
    return (
        <Grid
            item
            sm={4}
            pr={1}
            sx={{
                overflowY: {
                    xs: "none",
                    sm: "auto",
                },
                height: "fit-content",
                maxHeight: {
                    xs: "none",
                    sm: "100%",
                },
            }}
        >
            {stores.map((store, index) => (
                <Box key={index}>
                    <Typography>{store.city.toUpperCase()}</Typography>
                    <List>
                        <ListItem
                            key={store.name + index}
                            sx={{
                                p: "0px",
                            }}
                        >
                            <ListItemButton
                                onClick={() => {
                                    handleCurrentStoreDetail(store);
                                }}
                                className={
                                    place.name === store.name
                                        ? "Mui-selected"
                                        : null
                                }
                            >
                                <Typography>{store.name}</Typography>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                </Box>
            ))}
        </Grid>
    );
}

export default ListStores;
