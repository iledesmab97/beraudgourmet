"use client";

import OrdersTablet from "./OrdersTablet";
import OrdersList from "./OrdersList";

import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useGetModal from "@/hooks/useGetModal";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import { getAllOrdersOfUser } from "@/services/orderApi";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
        xs: "324px",
        sm: "700px",
    },
    height: {
        xs: "80%",
        sm: "700px",
    },
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 5,
    p: {
        xs: 2,
        sm: 5,
    },
};

function ModalUserOrders() {
    const { open, handleChangeModal } = useGetModal({
        modalType: "userOrders",
    });
    const { user } = useSelector(state => state.user)
    const [orders, setOrders] = useState([]);
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Refresca la lista de ordenes a su estado inical cada vez que se abre el modal
    useEffect(() => {
        if (!open) return
        handleChangePage(0)
    }, [open])

    async function handleChangePage(newPage) {
        const { newOrders, newCount } = await getOrders({ userId: user.id, page: newPage });
        if ( !newOrders || !newCount ) return
        setPage(newPage);
        setOrders(newOrders)
        setCount(newCount)
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    async function getOrders({ userId, page=0 }) {
        setLoading(true)
        let newOrders, newCount
        try {
            const { totalOrdersFront, count } = await getAllOrdersOfUser({
                userId,
                queries: {
                    itemsxPage: rowsPerPage,
                    page,
                    order2: "closed:ASC",
                    order1: "deliveryDate:ASC"
                }
            })
            newOrders = totalOrdersFront
            newCount = count
        } catch(error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
        return { newOrders, newCount }
    }

    return (
        <Modal
            open={open}
            onClose={() => {
                handleChangeModal("userOrders", "user");
                localStorage.removeItem("modalToOpen");
            }}
        >
            <Grid
                container
                wrap="nowrap"
                direction="column"
                justifyContent={"flex-start"}
                alignItems={"stretch"}
                sx={style}
            >
                <Grid
                    item
                    sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Typography
                        variant="title"
                        sx={{
                            mb: 3,
                        }}
                        align="center"
                    >
                        Historial de Orden
                    </Typography>
                </Grid>
                {isLargeScreen ? (
                    <OrdersTablet
                        orders={orders}
                        loading={loading}
                        pagination={{
                            count,
                            rowsPerPage,
                            page,
                            handleChangePage,
                            handleChangeRowsPerPage
                        }}
                    />
                ) : (
                    <OrdersList orders={orders} />
                )}
            </Grid>
        </Modal>
    );
}

export default ModalUserOrders;
