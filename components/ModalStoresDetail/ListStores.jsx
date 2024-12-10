"use client";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";
import { useState } from "react";

function ListStores({ handleCurrentStoreDetail, place }) {
    const { stores, status, error } = useSelector((state) => state.storeList);
    const [ storeList, setStoreList ] = useState(getStoreList(stores))

    function getStoreList(stores) {
        const storeList = {}
        stores.forEach(store => {
            const { city } = store
            if ( city in storeList) {
                storeList[city] = [ ...storeList[city], store]
            } else {
                storeList[city] = [store]
            }
        })
        return storeList
    }

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
            {Object.keys(storeList).map((city, index) => (
                <Box key={index}>
                    <Typography>{city.toUpperCase()}</Typography>
                    <List>
                        {
                            storeList[city].map(store => (
                                <ListItem
                                    key={store.id}
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
                            ))
                        }
                    </List>
                    <Divider />
                </Box>
            ))}
        </Grid>
    );
}

export default ListStores;
