"use client";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";

import ContainerItems from "../../components/ContainerItems/ContainerItems";
import OrderRewards from "../../components/OrderRewards/OrderRewards";
import ModalChooseProduct from "../../components/ModalChooseProduct/ModalChooseProduct";
import ModalStoreDelivery from "../../components/ModalStoreDelivery/ModalStoreDelivery";
import ModalDeliveryPlace from "../../components/ModalDeliveryPlace/ModalDeliveryPlace";
import ModalStoresDetail from "@/components/ModalStoresDetail/ModalStoresDetail";
import ModalUserInfo from "@/components/ModalUserInfo/ModalUserInfo";
import ModalChangePassword from "@/components/ModalChangePassword/ModalChangePassword";
import ModalChangeEmail from "@/components/ModalChangeEmail/ModalChangeEmail";
import ModalCheckoutForm from "@/components/ModalCheckoutForm/ModalCheckoutForm";
import ModalUserOrders from "@/components/ModalUserOrders/ModalUserOrders";

import CookieAlert from "@/components/CookiesAlert/CookieAlert";
import AlertPhoneMissing from "@/components/AlertPhoneMissing/AlertPhoneMissing";
import ShoppingCartButton from "@/components/ShoppingCartButton/ShoppingCartButton";
import AlertRecoverPassword from "@/components/AlertRecorverPassword/AlertRecorverPassword";
import PizzaCustomizable from "@/components/PizzaCustomizable/PizzaCustomizable";
import CenteredSpinner from "@/components/LoadingComponets/CenteredSpinner";
import AlertMessage from "@/components/AlertMessage/AlertMessage"

import useHandleSteps from "@/hooks/useHandleSteps";

import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useGetDrawer from "@/hooks/useGetDrawer";
import useLoadData from "@/hooks/useLoadData";
import { useDispatch, useSelector } from "react-redux";
import { addProductsListThunk } from "@/stores/actions/products";
import { fetchStoreListThunk } from "@/stores/actions/stores";
import useGetModal from '@/hooks/useGetModal'

import { getAllCompanies } from "@/services/companyApi";
import { getLocalData } from "@/utils/manageLocalStorage";

function Menu({ params }) {
    const [totalMatches, setTotalMatches] = useState("null");

    useHandleSteps();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const { drawer } = useGetDrawer();
    const [openOrderRewards, setOpenOrderRewards] = useState(false);
    const { loadData } = useLoadData();
    const { handleOpenModal } = useGetModal({ modalType: 'userOrders' })

    const dispatch = useDispatch();
    const { pizzas, salads, status, error } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        dispatch(addProductsListThunk());
    }, [dispatch]);

    // Cargar los productos, ingredientes, usuarios y tiendas
    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        setOpenOrderRewards(drawer.open);
    }, [drawer]);

    // Actualizar el valor de matches para las diferentes dimenciones de pantalla
    useEffect(() => {
        setTotalMatches(String(matches));
    }, [matches]);

    // Cargar las tiendas de la compañia
    useEffect(() => {
        getStores()
    }, [dispatch]);

    // Cargar el modal de ordenes del usuario
    useEffect(() => {
        const modalToOpen = getLocalData('modalToOpen')
        if (!modalToOpen) return
        handleOpenModal('userOrders')
    }, [])
    

    function toggleOpenOrderRewards(value) {
        setOpenOrderRewards(value);
    }

    async function getStores() {
        const { company: companyName } = params
        try {
            const [company] = await getAllCompanies({
                available: true,
                name: companyName
            })
            dispatch(fetchStoreListThunk({
                relation: "Schedules",
                relation2: "Company",
                available: true,
                Company: company.id
            }));
        } catch(error) {
            alert(error.message)
        }
    }

    return (
        <Container maxWidth="lg" sx={{ mt: matches ? "100px" : "40px" }}>
            <Grid
                container
                spacing={5}
                sx={{
                    pb: 3,
                    position: "relative",
                    // mt: matches ? '16px' : '0px'
                }}
            >
                {status === undefined || status === "pending" ? (
                    <Grid container item xs={12} md={8} spacing={3}>
                        <CenteredSpinner />
                    </Grid>
                ) : status === "failed" ? (
                    <p>{error}</p>
                ) : (
                    <>
                        <PizzaCustomizable />
                        <Grid container item xs={12} md={8} spacing={3}>
                            {pizzas.length > 0 && (
                                <ContainerItems
                                    itemList={pizzas}
                                    title={"Nuestra selección de Pizzas"}
                                    products={"pizzas"}
                                    sectionId={"pizzasSection"}
                                />
                            )}

                            {salads.length > 0 && (
                                <ContainerItems
                                    itemList={salads}
                                    title={"Nuestra selección de Ensaladas"}
                                    products={"salads"}
                                    sectionId={"saladsSection"}
                                />
                            )}
                        </Grid>
                    </>
                )}
                {totalMatches === "true" ? (
                    <>
                        <Drawer
                            open={openOrderRewards}
                            onClose={() => {
                                toggleOpenOrderRewards(false);
                            }}
                            anchor="right"
                        >
                            <OrderRewards />
                        </Drawer>
                    </>
                ) : totalMatches === "false" ? (
                    <OrderRewards />
                ) : null}
            </Grid>
            <ModalChooseProduct />
            <ModalStoreDelivery />
            <ModalDeliveryPlace />
            <ModalStoresDetail />
            <ModalUserInfo />
            <ModalChangePassword />
            <ModalChangeEmail />
            <ModalCheckoutForm />
            <ModalUserOrders />

            <CookieAlert />
            <AlertPhoneMissing />
            <AlertRecoverPassword />
            {totalMatches === "true" ? (
                <ShoppingCartButton
                    toggleOpenOrderRewards={toggleOpenOrderRewards}
                />
            ) : null}
            <AlertMessage />
        </Container>
    );
}

export default Menu;
