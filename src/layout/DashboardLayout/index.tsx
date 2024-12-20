'use client';

import { useEffect, ReactNode } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import Links from '@mui/material/Link';
import Box from '@mui/material/Box';

// project-imports
import Drawer from './Drawer';
import Header from './Header';
import Footer from './Footer';
import HorizontalBar from './Drawer/HorizontalBar';
import Loader from 'components/Loader';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

import useConfig from 'hooks/useConfig';
import { DRAWER_WIDTH, MenuOrientation } from 'config';
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// assets
import { ShoppingCart } from 'iconsax-react';

// ==============================|| MAIN LAYOUT ||============================== //

let value: string = window.location.search;
const params = new URLSearchParams(value);
const ispValue = params.get('isp');
const ispValueAvailable = ispValue !== null && parseInt(ispValue) === 1;

const url = ispValueAvailable ? 'https://1.envato.market/jrEAbP' : 'https://1.envato.market/zNkqj6';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const { menuMasterLoading } = useGetMenuMaster();
  const downXL = useMediaQuery(theme.breakpoints.down('xl'));
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { container, miniDrawer, menuOrientation } = useConfig();

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  // set media wise responsive drawer
  useEffect(() => {
    if (!miniDrawer) {
      handlerDrawerOpen(!downXL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downXL]);

  if (menuMasterLoading) return <Loader />;

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header />
      {!isHorizontal ? <Drawer /> : <HorizontalBar />}

      <Box component="main" sx={{ width: `calc(100% - ${DRAWER_WIDTH}px)`, flexGrow: 1, p: { xs: 1, sm: 3 } }}>
        <Toolbar sx={{ mt: isHorizontal ? 8 : 'inherit', mb: isHorizontal ? 2 : 'inherit' }} />
        <Container
          maxWidth={container ? 'xl' : false}
          sx={{
            ...(container && { px: { xs: 0, sm: 2 } }),
            position: 'relative',
            minHeight: 'calc(100vh - 124px)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Breadcrumbs />
          {children}
          <Footer />
        </Container>
        <Links style={{ textDecoration: 'none' }} href={url} target="_blank">
          <Button variant="contained" color="error" sx={{ zIndex: 1199, position: 'fixed', bottom: 50, right: 30 }}>
            <ListItemIcon>
              <ShoppingCart color={theme.palette.common.white} />
            </ListItemIcon>
            Buy Now
          </Button>
        </Links>
      </Box>
    </Box>
  );
}
