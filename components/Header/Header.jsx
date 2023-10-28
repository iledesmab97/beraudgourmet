import React from 'react';
import { AppBar, Toolbar, Container, Typography } from '@mui/material';
import NavBar from '../NavBar/NavBar'
function Header() {


  return (
    <AppBar position="static" >
      <Toolbar>
        <Container>
          <img src="/images/Header/logoBeraud.png" alt="logoBeraud" />
        </Container>
      </Toolbar>
      <NavBar />
    </AppBar>
  );
}

export default Header;
