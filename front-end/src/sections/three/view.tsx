'use client';

import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { endpoints, getBaseUrl, BaseUrlTypes } from 'src/utils/axios';

import { useSnackbar } from 'src/components/snackbar';
import { useSettingsContext } from 'src/components/settings';

import { TUser } from 'src/types/user';

import ChangePasswordForm from './form/change-password-form';

// ----------------------------------------------------------------------

export default function ThreeView() {
  const settings = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useState<TUser>();

  const getList = useCallback(async () => {
    try {
      const res = await axios.get(
        `/api/post?url=${getBaseUrl(BaseUrlTypes.ENUM_HOST_BASE_URI)}${
          endpoints.auth.get_login_user
        }`
      );
      if (res.status === 200 && res.data) {
        setUser(res.data);
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.error.message, { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    getList();
  }, [getList]);

  const show = useBoolean(false);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> {user?.fullName} </Typography>

      <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
          p: 3,
        }}
      >
        <Typography>
          <strong>И-мэйл: </strong>
          {user?.email}
        </Typography>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={show.onTrue}>
          Нууц үг солих
        </Button>
      </Box>
      <Dialog open={show.value} onClose={show.onFalse}>
        <DialogTitle>Нууц үг солих</DialogTitle>
        <DialogContent>
          <ChangePasswordForm onClose={show.onFalse} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}
