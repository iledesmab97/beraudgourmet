"use client";

import Image from "next/image";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Paper from "@mui/material/Paper";
import ModalPizzaDetail from "@/components/ModalPizzaDetails/ModalPizzaDetails";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import TablePagination from "@mui/material/TablePagination";

import TablePaginationActions from "@/components/TablePaginationActions/TablePaginationActions";

import { useState, useRef, useEffect } from "react";
import useGetAlertMessage from "@/hooks/useGetAlertMessage";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";

import styles from "./DataTable.module.css";
import { updateProductsListThunk } from "@/stores/actions/products";

const tableHeaders = {
    pizzas: ["Estatus", "Nombre", "Imagen", "Acción"],
};

function TablePizzas() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentPizza, setCurrentPizza] = useState(null);
    const [openPizzaDetail, setOpenPizzaDetail] = useState(false);
    const open = Boolean(anchorEl);
    const { handleUpdateAlertMessage } = useGetAlertMessage();
    const pizzaNew = useRef(false);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    const [totalMatches, setTotalMatches] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { pizzas, status, error } = useSelector((state) => state.products);
    const { status: updateStatus, error: updateError } = useSelector(
        (state) => state.products
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (!pizzaNew.current) return;
        setOpenPizzaDetail(true);
    }, [currentPizza]);

    useEffect(() => {
        setTotalMatches(matches);
    }, [matches]);

    useEffect(() => {
        handleUpdateAlertMessage({
            checked: true,
            text:
                updateStatus === "failed"
                    ? updateError
                    : "La acción termino con exito.",
            updateStatus,
        });
    }, [updateStatus, updateError]);

    function handleOpenPizzaDetail(value) {
        setOpenPizzaDetail(value);
        handleCloseMenu();
        if (!value) {
            setCurrentPizza(null);
            pizzaNew.current = false;
        }
    }

    function handleClickButtonAction(event, pizza) {
        setAnchorEl(event.currentTarget);
        setCurrentPizza(pizza);
    }

    function handleCloseMenu() {
        setAnchorEl(null);
    }

    function addNewPizza() {
        setCurrentPizza({
            id: 0,
            name: "",
            text: "",
            image: "",
            ingredients: [""],
            price: {
                "30cm": {
                    "Masa Tradicional": "",
                },
            },
        });
        pizzaNew.current = true;
        handleOpenPizzaDetail(true);
    }

    async function handleStatusPizza() {
        const properties = {
            id: currentPizza.id,
            property: "status",
            value: currentPizza.status === "ACTIVE" ? "DESACTIVE" : "ACTIVE",
        };
        dispatch(updateProductsListThunk("pizzas", properties));
        handleCloseMenu();
    }

    function handleChangePage(newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    return (
        <Paper
            sx={{
                position: "relative",
                // overflowY: 'hidden',
            }}
        >
            <TableContainer
                className={styles.DataTable}
                sx={{
                    height: "500px",
                }}
            >
                <Table
                    stickyHeader
                    size={rowsPerPage > 60 ? "small" : "medium"}
                >
                    <TableHead>
                        <TableRow>
                            {tableHeaders.pizzas.map((column) => (
                                <TableCell
                                    key={column}
                                    align="center"
                                    sx={{
                                        bgcolor: "rgb(98, 110, 122)",
                                        color: "white",
                                        fontSize: "0.975rem",
                                    }}
                                >
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody className={styles.DataTableBody}>
                        {status === "loading" && <h1>{status}...</h1>}
                        {error && <h1>{error}</h1>}
                        {pizzas
                            ? pizzas.map((pizza) => (
                                  <TableRow key={pizza.id}>
                                      <TableCell align="center">
                                          {pizza.status === "ACTIVE" ? (
                                              <CheckCircleIcon
                                                  sx={{ color: "#4caf50" }}
                                              />
                                          ) : (
                                              <CancelIcon
                                                  sx={{ color: "#f6685e" }}
                                              />
                                          )}
                                      </TableCell>
                                      <TableCell align="center">
                                          {pizza.name}
                                      </TableCell>
                                      <TableCell align="center">
                                          {pizza.image ? (
                                              <Image
                                                  src={pizza.image}
                                                  alt={pizza.name}
                                                  width={130}
                                                  height={100}
                                                  style={{
                                                      objectFit: "contain",
                                                  }}
                                              />
                                          ) : null}
                                      </TableCell>
                                      <TableCell align="center">
                                          <IconButton
                                              onClick={(event) => {
                                                  handleClickButtonAction(
                                                      event,
                                                      pizza
                                                  );
                                              }}
                                          >
                                              <MoreHorizIcon />
                                          </IconButton>
                                      </TableCell>
                                  </TableRow>
                              ))
                            : null}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={pizzas ? pizzas.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => {
                    handleChangePage(newPage);
                }}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={"Filas por página"}
                ActionsComponent={TablePaginationActions}
            />
            <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
                <MenuItem onClick={handleStatusPizza}>
                    {currentPizza?.status ? "Desactivar" : "Activar"}
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleOpenPizzaDetail(true);
                    }}
                >
                    Ver Detalles
                </MenuItem>
            </Menu>
            {currentPizza ? (
                <ModalPizzaDetail
                    openPizzaDetail={openPizzaDetail}
                    handleOpenPizzaDetail={handleOpenPizzaDetail}
                    currentPizza={currentPizza}
                    pizzaNew={pizzaNew.current}
                />
            ) : null}
            <Box
                sx={{
                    position: "absolute",
                    bottom: "102%",
                    right: "16px",
                }}
            >
                {!totalMatches ? (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={addNewPizza}
                        disabled={!pizzas}
                    >
                        Nueva Pizza
                    </Button>
                ) : (
                    <IconButton
                        onClick={addNewPizza}
                        disabled={!pizzas}
                        sx={{
                            bgcolor: "#295386",
                            color: "white",
                            "&:hover": {
                                color: "#295386",
                            },
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                )}
            </Box>
        </Paper>
    );
}

export default TablePizzas;
