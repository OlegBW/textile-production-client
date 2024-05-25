import Header from '../components/header';
import DrawerMenu from '../components/drawer';
import Footer from '../components/footer';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

export default function DefaultLayout() {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <CssBaseline />
      <Container component="main" sx={{ minHeight: '100vh', paddingTop: 8 }}>
        <Header onMenuClick={() => setShowDrawer(!showDrawer)} />
        <DrawerMenu isOpen={showDrawer} onClose={() => setShowDrawer(false)} />
        <Outlet />
        <Footer />
      </Container>
    </>
  );
}
