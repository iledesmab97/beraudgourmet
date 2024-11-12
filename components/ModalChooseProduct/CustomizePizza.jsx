"use client";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";

import MasaTypesPizza from "@/components/MasaTypesPizza/MasaTypesPizza";
import MoveDown from "@/components/MoveDown/MoveDown";
import CenteredSpinner from "@/components/LoadingComponets/CenteredSpinner";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import useGetExtraIngredients from "@/hooks/useGetExtraIngredients";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { delay } from "@/utils/wait";

export default function CustomizePizza({ customizePizza, currentProduct }) {
    const { extraIngredients } = useGetExtraIngredients();
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

    const {
        size,
        // handleSize,
        mass,
        handleMass,
        ingredientsModal,
        handleIngredientsModal,
        extra,
        handleExtra,
    } = customizePizza;

    return (
        <Grid
            id="modal-container-customizePizza"
            item
            container
            md
            direction={"column"}
            wrap="nowrap"
            alignItems={"flex-start"}
            spacing={2}
            sx={{
                height: {
                    xs: "auto",
                    md: "85%",
                },
                // position: 'relative',
                overflowY: {
                    xs: "hidden",
                    md: "auto",
                },
            }}
        >
            {/* CONTENIDO PARA ELEGIR EL TAMAÑO DE LA PIZZA */}
            {/* <Grid
                item
                container
                direction={'column'}
                spacing={1}
            >
                <Grid item>
                    <Typography
                        id="modal-modal-description"
                        variant='title'
                    >
                        ELIGE EL TAMAÑO
                    </Typography>
                </Grid>
                <Grid item>
                    <ButtonGroupPizza handleClick={handleSize} size={size} listSizes={Object.keys(currentProduct.price)} />
                </Grid>
            </Grid> */}
            {currentProduct.productType === "pizza" ? (
                <Grid
                    item
                    container
                    direction={"column"}
                    alignItems={"flex-start"}
                    wrap="nowrap"
                    spacing={1}
                >
                    <Grid item>
                        <Typography
                            id="modal-subtitle-ELIGE_LA_MASA"
                            variant="title"
                        >
                            ELIGE LA MASA
                        </Typography>
                    </Grid>
                    {}
                    <Grid
                        item
                        sx={{
                            width: "95%",
                        }}
                    >
                        <MasaTypesPizza
                            listMass={currentProduct.price[size]}
                            mass={mass}
                            handleMass={handleMass}
                        />
                    </Grid>
                </Grid>
            ) : null}
            <Grid item>
                <Typography id="modal-modal-description" variant="title">
                    QUITAR INGREDIENTES
                </Typography>
            </Grid>

            <Grid item container direction={"column"} spacing={1}>
                <Grid item>
                    <FormGroup onChange={handleIngredientsModal}>
                        {currentProduct.ingredients.map((ingredient, index) => (
                            <FormControlLabel
                                key={ingredient.name + index}
                                control={
                                    <Checkbox
                                        checked={
                                            ingredientsModal.includes(
                                                ingredient.name
                                            )
                                                ? false
                                                : true
                                        }
                                    />
                                }
                                label={ingredient.name}
                                sx={
                                    ingredientsModal.includes(ingredient.name)
                                        ? {
                                              textDecoration: "line-through",
                                          }
                                        : {}
                                }
                            />
                        ))}
                    </FormGroup>
                </Grid>
            </Grid>

            <Grid
                item
                container
                direction={"column"}
                alignItems={"flex-start"}
                wrap="nowrap"
                spacing={{
                    xs: 0,
                    sm: 1,
                }}
            >
                <Grid item>
                    <Typography
                        id="modal-subtitle-AGREGAR_INGREDIENTES"
                        variant="title"
                    >
                        AGREGAR INGREDIENTES
                    </Typography>
                </Grid>

                <Grid
                    item
                    sx={{
                        width: "100%",
                    }}
                >
                    <TableContainer
                        component={Paper}
                        sx={{
                            width: "95%",
                        }}
                    >
                        <Table size="small">
                            <TableBody>
                                {Object.values(extraIngredients)
                                    .filter(
                                        (ingredient) => ingredient.available
                                    )
                                    .map((ingredient) => {
                                        return (
                                            <TableRow
                                                key={ingredient.name}
                                                sx={{
                                                    borderBottom:
                                                        "1px solid rgba(224, 224, 224, 1)",
                                                }}
                                            >
                                                <TableCell
                                                    sx={{
                                                        height: "100%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "space-between",
                                                        px: {
                                                            xs: 1,
                                                        },
                                                        borderBottom: "none",
                                                    }}
                                                >
                                                    <IconButton
                                                        size="small"
                                                        variant="contained"
                                                        onClick={() => {
                                                            handleExtra({
                                                                ingredient,
                                                                operation: "-",
                                                            });
                                                        }}
                                                        name="-"
                                                        value={ingredient.name}
                                                        disabled={
                                                            extra[
                                                                ingredient.name
                                                            ] === 0 ||
                                                            extra[
                                                                ingredient.name
                                                            ] === undefined
                                                                ? true
                                                                : false
                                                        }
                                                        sx={{
                                                            scale: {
                                                                xs: "0.65",
                                                                md: "0.70",
                                                            },
                                                            bgcolor: "#295386",
                                                            color: "#FFFDFF",
                                                            "&:hover": {
                                                                color: "#295386",
                                                            },
                                                        }}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    <Typography id="modal-modal-description">
                                                        {extra[ingredient.name]
                                                            ? extra[
                                                                  ingredient
                                                                      .name
                                                              ]
                                                            : 0}
                                                    </Typography>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => {
                                                            handleExtra({
                                                                ingredient,
                                                                operation: "+",
                                                            });
                                                        }}
                                                        name="+"
                                                        value={ingredient.name}
                                                        sx={{
                                                            scale: {
                                                                xs: "0.65",
                                                                md: "0.70",
                                                            },
                                                            bgcolor: "#295386",
                                                            color: "#FFFDFF",
                                                            "&:hover": {
                                                                color: "#295386",
                                                            },
                                                        }}
                                                    >
                                                        <AddIcon />
                                                        {/* + */}
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        px: {
                                                            xs: 1,
                                                            sm: 2,
                                                        },
                                                    }}
                                                >
                                                    {ingredient.name}
                                                </TableCell>
                                                <TableCell>
                                                    {"$" +
                                                        ingredient.totalPrice}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <MoveDown
                sectionToGo={"#modal-subtitle-AGREGAR_INGREDIENTES"}
                containerId={
                    isLargeScreen
                        ? "#modal-container-customizePizza"
                        : "#container-modal-order-pizza"
                }
            />
        </Grid>
    );
}
