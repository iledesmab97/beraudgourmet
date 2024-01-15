"use client";
// import About from './about/page';
// import Header from '@/components/Header/Header'
// import Footer from '@/components/Footer/Footer'
// import { Grid } from '@mui/material';
import { useEffect } from 'react'
import { getAllStores } from '@/api/storeApi'
import useGetStoreList from '@/hooks/useGetStoreList'

export default function Home() {

  const { handleAddStoreList } = useGetStoreList()

  useEffect(() => {
    getAllStores()
  }, [])

  return (
    <h1>Página principal</h1>
    // <Grid container>
    //       <Grid item> <Header /></Grid>
    //       <Grid item> <About /></Grid>
    //       <Grid item> <Footer /></Grid>
    // </Grid>
  );
}