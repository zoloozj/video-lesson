import { useRouter } from 'next/navigation';

import Stack from '@mui/material/Stack';
import { MenuItem } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';

import { useAuthContext } from 'src/auth/hooks';

export default function CustomSettings() {
  const router = useRouter();
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/');
    } catch (error) {
      console.error(error);
    }
  };

  const renderContent = (
    <Stack
      flexGrow={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={{ xs: 0.5, sm: 1 }}
    >
      <Divider
        variant="fullWidth"
        orientation="horizontal"
        sx={{ border: '1px solid text.secondary', width: '100%' }}
      />

      <MenuItem
        onClick={handleLogout}
        sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
      >
        Гарах
      </MenuItem>
    </Stack>
  );

  return (
    // <AppBar
    //   sx={{
    //     height: HEADER.H_MOBILE,
    //     zIndex: theme.zIndex.appBar + 1,
    //     ...bgBlur({
    //       color: theme.palette.background.default,
    //     }),
    //     transition: theme.transitions.create(['height'], {
    //       duration: theme.transitions.duration.shorter,
    //     }),
    //     ...(lgUp && {
    //       width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
    //       height: HEADER.H_DESKTOP,
    //       ...(offsetTop && {
    //         height: HEADER.H_DESKTOP_OFFSET,
    //       }),
    //       ...(isNavHorizontal && {
    //         width: 1,
    //         bgcolor: 'background.default',
    //         height: HEADER.H_DESKTOP_OFFSET,
    //         borderBottom: `dashed 1px ${theme.palette.divider}`,
    //       }),
    //       ...(isNavMini && {
    //         width: `calc(100% - ${NAV.W_MINI + 1}px)`,
    //       }),
    //     }),
    //   }}
    // >
    <Toolbar sx={{ mb: 3 }}>{renderContent}</Toolbar>
    // </AppBar>
  );
}
