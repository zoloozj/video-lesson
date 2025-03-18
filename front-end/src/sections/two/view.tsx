'use client';

import axios from 'axios';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useAuthContext } from 'src/auth/hooks';
import { useSnackbar } from 'src/components/snackbar';
import { useCallback, useEffect, useState } from 'react';
import { useSettingsContext } from 'src/components/settings';
import { BaseUrlTypes, endpoints, getBaseUrl } from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function TwoView() {
  const settings = useSettingsContext();
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [course, setCourse] = useState<any[]>([]);

  const getList = useCallback(async () => {
    try {
      const res = await axios.post('/api/post', {
        serviceUrl: getBaseUrl(BaseUrlTypes.ENUM_HOST_BASE_URI) + endpoints.course.get_by_userEmail,
        userEmail: user?.email,
      });
      if (res.status === 200) {
        setCourse(res.data);
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.error.message, { variant: 'error' });
    }
  }, [user, enqueueSnackbar]);

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Page Two </Typography>

      <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      />
    </Container>
  );
}
